import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Configuracion } from '../componentes/config/config.jsx';
import { Rosco } from '../componentes/rosco/rosco.jsx';
import { BotonJugar } from '../componentes/rosco/botonJugar.jsx';
import { InfoPalabra } from '../componentes/rosco/tarjetaPalabra.jsx';

const navigate = useNavigate(); // para navegar hacia las otras páginas cuando finalice la partida

export function Partida() {

    // useState devuelve [estado actual(cómo el estado inicial seteado, ej: true en mostrarConfig), set..Algo: que permite actualizar el estado(función)]
    const [mostrarConfig, setMostrarConfig] = useState(true); // state para mostrar/ocultar la Configuración
    const [ajustesJuego, setAjustesjuego] = useState(null); // state para guardar los datos de la partida
    
    const tiempoTranscurridoRef = useRef(0);
    const [tiempoRestante, setTiempoRestante] = useState(0); // tiempo de partida (inicializado en 0)

    const [palabras, setPalabras] = useState([]); // inicializa un array vacío para las palabras
    const [cargando, setCargando] = useState(false); // cómo pantalla de carga para cuando haga la consulta a la BDD

    // para arrancar el juego
    const [juegoActivo, setJuegoActivo] = useState(false);
    const [idPartida, setIdPartida] = useState(null);
    // Lógica del Rosco
    const [estadoLetras, setEstadoLetras] = useState([]); // Array para guardar el estado de cada letra (correcta, pendiente, etc..)
    const estadoLetrasRef = useRef([]); // misma info de estadoLetras pero sin problemas de stale closures
    useEffect(() => {
        estadoLetrasRef.current = estadoLetras;
    }, [estadoLetras]);
    const [indiceActual, setIndiceActual] = useState(0); // para saber por cuál palabra va (ya que están en un array)
    const [respuesta, setRespuesta] = useState(""); // Respuesta del usuario en el input
    // Para luego imprimir los datos de la partida
    const [resultadoPartida, setResultadoPartida] = useState(null);

    // Función para que utilice el Componente 'Config' ESTA ES UNA FORMA DE Q EL COMPONENTE HIJO PASE DATOS HACIA ARRIBA, para Juego.jsx
    const guardarConfig = (datosConfiguracion) => {
        setAjustesjuego(datosConfiguracion); // setea los datos de configuración
        setMostrarConfig(false); // una vez inicia la partida oculta la configuración
        console.log("Partida iniciada. Ajustes: ", datosConfiguracion);
    }

    // useEffect -> (configuración (función con la lógica del Efecto), dependencias (valores que al actualizarse ejecuten el Efecto))
    // BUSCA LAS PALABRAS DEL ROSCO
    useEffect(() => {
        if (!ajustesJuego) { // si sigue seteado en null (o sea no se ejecutó guardarConfig y el modal sigue abierto)
            return; // no hace nada
        }
        const traerPalabras = async () => { // si se seteo una configuración entonces VA a buscar las palabras a la BDD
            setCargando(true); // NO FUNCIONA ESTE STATE ACÁ. VER CÓMO CAMBIARLO
            try {
                // Manda la dificultad de los ajustesJuego al PHP por la URL
                const respuesta_palabras = await fetch(`http://localhost/el_rosco_backend/traer_palabras.php?dificultad=${ajustesJuego.dificultad}`);
                const resultado_palabras = await respuesta_palabras.json();

                setPalabras(resultado_palabras.palabras); // actualiza el estado de palabras con el ARRAY DE LAS PALABRAS traídas de la BDD. .palabras viene directo del PHP
                setTiempoRestante(Number(ajustesJuego.tiempo)) // .tiempo viene directo del PHP
                // Para arrancar en mi array de estados, con TODAS las letras en 'pendiente'
                setEstadoLetras(Array(resultado_palabras.palabras.length).fill('pendiente'));

                console.log("Palabras traidas: ", resultado_palabras.palabras);
            } catch (error) {
                console.error("Error al traer las palabras:", error);
            } finally {
                // por si queremos poner una PANTALLA DE CARGA (usar state de cargando, ver como hacer que funcione)
            }
        }

        traerPalabras();
    }, [ajustesJuego]); // ajustesJuego -> dependencia, cuando cambie se ejecuta useEffect()


    // CREA LA PARTIDA, CONECTANDO SUS DATOS CON EL PHP
    const iniciarJuego = async () => {
        setJuegoActivo(true); // señal de largada

        try {
            const respuesta_partida = await fetch('http://localhost/el_rosco_backend/manejar_partida.php', {
                method: 'POST',
                credentials: 'include', // Obliga a React a mandar la COOKIE (contiene el id_user)
                headers: {'Content-Type': 'application/json'}, // le avisa al PHP que el formato es JSON
                body: JSON.stringify({
                    accion: 'crear',
                    dificultad: ajustesJuego.dificultad,
                    tiempo_partida: ajustesJuego.tiempo,
                    ayuda: ajustesJuego.ayuda
                })
            });
            const datos = await respuesta_partida.json();

            if (datos.success) {
                setIdPartida(datos.id_partida); // Guarda el ID de partida que trajo el PHP
            }
        } catch (error) {
            console.error("Error al crear la partida", error);
        }
    }

    // FINALIZA LA PARTIDA, ACTUALIZA SU ESTADO EN EL BACK
    const finalizarJuego = async (estadosFinales, estadoPartida) => {
        // Cuenta cuántas letras quedaron en 'correcta'
        const puntajeFinal = estadosFinales.filter(e => e === 'correcta').length;

        try {
            const respuesta_actualizar = await fetch('http://localhost/el_rosco_backend/manejar_partida.php', {
                method: 'POST',
                credentials: 'include',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    accion: 'actualizar',
                    id_partida: idPartida,
                    puntaje: puntajeFinal,
                    estado: estadoPartida,
                    tiempo_transcurrido: tiempoTranscurridoRef.current
                })
            });
            const datos = await respuesta_actualizar.json();
            console.log("Partida actualizada:", datos);

            // Guarda el resultado de la partida para imprimirlo (independientemente si se guardó en la BDD)
            setResultadoPartida( {
                puntaje: puntajeFinal,
                estado: estadoPartida,
                tiempo: tiempoTranscurridoRef.current
            });
        } catch (error) {
            console.error("Error al actualizar la partida", error);
            // Aunque falle el guardado en BDD vamos a imprimir el resultado al usuario igual (para q no quede trabado)
            setResultadoPartida({puntaje: puntajeFinal, estado: estadoPartida, tiempo: tiempoTranscurridoRef.current});
        }
    }


    // CRONÓMETRO: 2 useEffect para el control del Tiempo //
    //
    useEffect(() => {
        if (!juegoActivo) {
            return;
        }
        // setInterval ejecuta: (función, cada cierto tiempo en ms).
        // esto el navegador lo devuelve en un ID que lo guardamos en la const 'intervalo'
        const intervalo = setInterval(() => {
            tiempoTranscurridoRef.current += 1; // siempre suma de a +1
            if (ajustesJuego.tiempo === '0') { // Sin límite de tiempo
                setTiempoRestante(tiempoTranscurridoRef.current);
            } else { // Con límite de tiempo
                const restante = Number(ajustesJuego.tiempo) - tiempoTranscurridoRef.current;
                setTiempoRestante(Math.max(restante, 0));
            }
        }, 1000); // cada 1000ms = 1seg

        return () => clearInterval(intervalo); // para apagar el reloj si salimos de la pantalla
    }, [juegoActivo, ajustesJuego]); // dependencias del useEffect

    // Para cuando se agota el tiempo
    useEffect(() => {
        if (!juegoActivo) return;
        if (ajustesJuego.tiempo === '0') return; // sin límite, no aplica
        if (tiempoRestante > 0) return;

        setJuegoActivo(false);
        finalizarJuego(estadoLetrasRef.current, 'tiempo_agotado');
    }, [tiempoRestante, juegoActivo]);


    // TURNOS DEL ROSCO
    const avanzarTurno = (estadosActualizados) => {
        let proximoIndice = indiceActual + 1; // índice correspondiente al número de la próxima letra en el array
        let letrasRevisadas = 0;

        while (letrasRevisadas < palabras.length) { // mientras no se hayan revisado ya todas las letras básicamente
            if (proximoIndice > palabras.length) { // lógica para poder dar más de una vuelta al rosco
                proximoIndice = 0; // cuando ya completó la vuelta (llegó al último índice), reinicia el índice
            }
            if (estadosActualizados[proximoIndice] === 'pendiente') {
                setIndiceActual(proximoIndice); // AVANZA 1 TURNO, A LA SIGUIENTE PALABRA
                return;
            }
            // incremento en +1
            proximoIndice++;
            letrasRevisadas++;
        }
        // Acá ya revisó todas las letras y ninguna debió quedar 'pendiente'
        setJuegoActivo(false);
        finalizarJuego(estadosActualizados, 'completada');
        alert("Rosco terminado");
    }

    // ADIVINAR PALABRA
    const adivinar = (e) => {
        e.preventDefault(); // para prevenir el comportamiento por defecto (que al mandar el submit recargue la página), y manejarlo con JS en 2°plano

        if (respuesta.trim() === "") { return; } // No puedo mandar el input vacío. trim = remueve espacios en blanco

        const palabraCorrecta = palabras[indiceActual].palabra.toLowerCase(); // trae la palabra CORRECTA del array de palabras cargado
        const intento = respuesta.trim().toLowerCase();

        const nuevosEstados = [...estadoLetras]; // copia el array de todos lo estados, ... indica la propagación en todos los índices
        // debe copiarse todo el array, porque para que React detecte el cambio debe alterarse toda la estructura, y no 1 solo valor.

        if (intento === palabraCorrecta) {
            nuevosEstados[indiceActual] = 'correcta';
        } else {
            nuevosEstados[indiceActual] = 'incorrecta';
        }

        setEstadoLetras(nuevosEstados) // actualiza el array con 1 de sus índices cambiado
        setRespuesta(""); // Limpia el input

        // AVANZA UN TURNO EN EL ROSCO //
        avanzarTurno(nuevosEstados); // Con el estado de las letras actualizado
    }

    // PASAR PALABRA
    const pasar_palabra = () => {
        // const nuevosEstados = [...estadoLetras]; // copia del array de estados
        // nuevosEstados[indiceActual] = 'pendiente'; // sigue en pendiente para que pueda jugarse en el próx. turno

        // setEstadoLetras(nuevosEstados);
        setRespuesta(""); // Limpia el input

        // AVANZA UN TURNO EN EL ROSCO //
        avanzarTurno(estadoLetras);
    }


    return (
        <>
            {/* arranca con mostrarConfig = true y renderiza <Config> */}
            {/* && = IF. Si es true, lee lo que continúa a su derecha, caso contrario corta ahí. Útil en vez de un IF tradicional, porque JSX no lo permite en medio de una etiqueta */}
            {mostrarConfig && !juegoActivo &&
                <Configuracion onGuardar={guardarConfig} />}
            <Rosco estadoLetras={estadoLetras} indiceActual={indiceActual}>
                {/* CHILDREN del Rosco */}
                {/* si: el juego no comenzó */}
                {!juegoActivo ? ( // IF
                    <BotonJugar onIniciar={iniciarJuego} /> // renderiza el botón de Jugar
                ) : ( // ELSE: aparezca la definición aca
                    <InfoPalabra palabraActual={palabras[indiceActual]} mostrarAyuda={ajustesJuego.ayuda}/> // pasa como prop: palabra actual, la opción de ayuda de la config 
                )
                }
            </Rosco>
            {juegoActivo && (
                <>
                    <div id='tiempo'>
                        <h2>Tiempo: {tiempoRestante}</h2>
                    </div>
                    <div id='controles-juego'>
                        <form onSubmit={adivinar}> {/* un FORM para que ande el ENTER */}
                            {/* actualiza el estado de 'respuesta' con cada tecla */}
                            <input type='text' id='input-adivinar' placeholder='Respuesta...' autoFocus
                                value={respuesta} onChange={(e) => setRespuesta(e.target.value)} />
                            <button type='submit' className='botones-juego'>Adivinar</button>
                            <button type='button' className='botones-juego' onClick={pasar_palabra}>Pasapalabra</button>
                        </form>
                    </div>
                </>
            )}
        </>
    )
}