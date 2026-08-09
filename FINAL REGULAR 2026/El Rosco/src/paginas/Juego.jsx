import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Configuracion } from '../componentes/config/config.jsx';
import { Rosco } from '../componentes/rosco/rosco.jsx';
import { BotonJugar } from '../componentes/rosco/botonJugar.jsx';
import { InfoPalabra } from '../componentes/rosco/tarjetaPalabra.jsx';
import { ModalFinPartida } from '../componentes/finPartida/finPartida.jsx';
import { MejoresPartidas } from '../componentes/rosco/mejoresPartidas.jsx';


export function Partida() {
    
    const navegar = useNavigate(); // para navegar hacia las otras páginas cuando finalice la partida

    // useState devuelve [estado actual(cómo el estado inicial seteado, ej: true en mostrarConfig), set..Algo: que permite actualizar el estado(función)]
    const [mostrarConfig, setMostrarConfig] = useState(true); // state para mostrar/ocultar la Configuración
    const [ajustesJuego, setAjustesjuego] = useState(null); // state para guardar los datos de la partida
    const [mejoresPartidas, setMejoresPartidas] = useState([]); // state para traer las mejores partidas del usuario

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
    const [resultadoPartida, setResultadoPartida] = useState(null); // cuando se setea se muestra

    // Función para que utilice el Componente 'Config' ESTA ES UNA FORMA DE Q EL COMPONENTE HIJO PASE DATOS HACIA ARRIBA, para Juego.jsx
    const guardarConfig = (datosConfiguracion) => {
        setAjustesjuego(datosConfiguracion); // setea los datos de configuración
        setMostrarConfig(false); // una vez inicia la partida oculta la configuración
        console.log("Partida iniciada. Ajustes: ", datosConfiguracion);
    }

    // BUSCA LAS PALABRAS DEL ROSCO
    // useEffect -> (configuración (función con la lógica del Efecto), dependencias (valores que al actualizarse ejecuten el Efecto))
    useEffect(() => {
        if (!ajustesJuego) { // si sigue seteado en null (o sea no se ejecutó guardarConfig y el modal sigue abierto)
            return; // no hace nada
        }
        const traerPalabras = async () => { // si se seteo una configuración entonces VA a buscar las palabras a la BDD
            setCargando(true); // NO FUNCIONA ESTE STATE ACÁ. VER CÓMO CAMBIARLO
            try {
                // Manda la dificultad de los ajustesJuego al PHP por la URL
                const respuesta_palabras = await fetch(`http://localhost/el_rosco_backend/juego/traer_palabras.php?dificultad=${ajustesJuego.dificultad}`);
                const resultado_palabras = await respuesta_palabras.json();

                setPalabras(resultado_palabras.palabras); // actualiza el estado de palabras con el ARRAY DE LAS PALABRAS traídas de la BDD. .palabras viene directo del PHP
                setTiempoRestante(Number(ajustesJuego.tiempo)) // .tiempo viene directo del PHP
                // Para arrancar en mi array de estados, con TODAS las letras en 'pendiente'
                setEstadoLetras(Array(resultado_palabras.palabras.length).fill('pendiente'));

                console.log("Palabras traidas.");
            } catch (error) {
                console.error("Error al traer las palabras:", error);
            } finally {
                // por si queremos poner una PANTALLA DE CARGA (usar state de cargando, ver como hacer que funcione)
            }
        }

        traerPalabras();
    }, [ajustesJuego]); // ajustesJuego -> dependencia, cuando cambie se ejecuta useEffect()

    // TRAE LAS MEJORES PARTIDAS DEL USER (si tiene) DEL BACKEND
    useEffect(() => {
        const traerMejores = async () => {
            try {
                const respuesta_mejores = await fetch('http://localhost/el_rosco_backend/juego/mejores_partidas.php', {
                    credentials: 'include'
                });
                const datos = await respuesta_mejores.json();
                if (datos.success) {
                    setMejoresPartidas(datos.mejores_partidas); // las setea usando el state
                }
            } catch (error) {
                console.error("Error al traer mejores partidas", error);
            }
        };
        traerMejores();
    }, [resultadoPartida]); // corre cuando se carga el resultado de una partida (cuando apenas termina)

    // CREA LA PARTIDA, CONECTANDO SUS DATOS CON EL PHP
    const iniciarJuego = async () => {
        setJuegoActivo(true); // señal de largada

        try {
            const respuesta_partida = await fetch('http://localhost/el_rosco_backend/juego/manejar_partida.php', {
                method: 'POST',
                credentials: 'include', // Obliga a React a mandar la COOKIE (contiene el id_user)
                headers: { 'Content-Type': 'application/json' }, // le avisa al PHP que el formato es JSON
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
            const respuesta_actualizar = await fetch('http://localhost/el_rosco_backend/juego/manejar_partida.php', {
                method: 'POST',
                credentials: 'include',
                headers: { 'Content-Type': 'application/json' },
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
            setResultadoPartida({
                puntaje: puntajeFinal,
                estado: estadoPartida,
                tiempo: tiempoTranscurridoRef.current
            });
        } catch (error) {
            console.error("Error al actualizar la partida", error);
            // Aunque falle el guardado en BDD vamos a imprimir el resultado al usuario igual (para q no quede trabado)
            setResultadoPartida({ puntaje: puntajeFinal, estado: estadoPartida, tiempo: tiempoTranscurridoRef.current });
        }
    }

    ///////////////// LÓGICA DEL JUEGO ///////////////////////////

    // CRONÓMETRO: 2 useEffect para el control del Tiempo //
    // Para contar hacia adelante o hacia atrás (según el modo)
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
    //
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
            if (proximoIndice >= palabras.length) { // lógica para poder dar más de una vuelta al rosco
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
    }

    // ADIVINAR PALABRA
    const adivinar = (e) => {

        // normaliza la palabra traída de la BDD para poder compararla con el input del user
        function normalizar(texto) {
            return texto
                .normalize('NFD')                // separa la letra de su tilde (á -> a + ´)
                .replace(/[\u0300-\u036f]/g, '') // elimina las tildes sueltas
                .toLowerCase()
                .trim();
        }

        e.preventDefault(); // para prevenir el comportamiento por defecto (que al mandar el submit recargue la página), y manejarlo con JS en 2°plano

        if (respuesta.trim() === "") { return; } // No puedo mandar el input vacío. trim = remueve espacios en blanco

        const palabraCorrecta = normalizar(palabras[indiceActual].palabra); // trae la palabra CORRECTA (y normalizada) del array de palabras cargado 
        const intento = normalizar(respuesta); // normaliza el intento también

        const nuevosEstados = [...estadoLetras]; // copia el array de todos lo estados, '...' indica la propagación en todos los índices
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


    /////////////// NAVEGACIÓN /////////////////////

    const jugarDeNuevo = () => { // reinicia todos los datos de partida
        setResultadoPartida(null);
        setMostrarConfig(true); // vuelve a mostrar las configuraciones de partida por su useEffect
        setAjustesjuego(null);
        setJuegoActivo(false);
        setIdPartida(null);
        setPalabras([]);
        setEstadoLetras([]);
        setIndiceActual(0);
        setRespuesta("");
        setTiempoRestante(0);
        tiempoTranscurridoRef.current = 0;
    }

    const volverInicio = async () => {
        try {
            await fetch('http://localhost/el_rosco_backend/autenticacion/logout.php', { // DESTRUYE LA SESIÓN EN EL BACK
                method: 'POST',
                credentials: 'include'
            });
        } catch (error) {
            console.error("Error al cerrar sesión", error);
        }
        navegar('/'); // manda a Inicio.jsx, sea cual sea el resultado del logout
    }

    const irRankings = () => {
        navegar('/rankings');
    }

    // Por si el usuario cierra la pestaña/navegador
    useEffect(() => {
        // ESTE MANEJADOR SOLO SE EJECUTA POR EL OBJETO WINDOW DEBAJO SUYO, (sin importar que juegoActivo, idPartida cambien)
        const manejadorBeforeUnload = () => {
            if (juegoActivo && idPartida) {
                // necesita el ref de estadoLetras porq el beforeunload se agregará como evento sólo por cada cambio [juegoActivo, idPartida]
                // pudiendo dispararse muuucho después, quedando con un estadoLetras viejo.
                const puntajeFinal = estadoLetrasRef.current.filter(e => e === 'correcta').length;

                const datosPartida = JSON.stringify({
                    accion: 'actualizar',
                    id_partida: idPartida,
                    puntaje: puntajeFinal,
                    estado: 'abandonada',
                    tiempo_transcurrido: tiempoTranscurridoRef.current
                });
                // manda el POST incluso si la página se está cerrando!
                navigator.sendBeacon( // navigator es una API nativa que provee el navegador a través del objeto window
                    'http://localhost/el_rosco_backend/juego/manejar_partida.php',
                    new Blob([datosPartida], {type: 'application/json'}) // manda los datos anteriores como un json
                );
            }
        };

        // si el navegador dispara 'beforeunload' entonces SI se ejecuta el manejador de arriba
        window.addEventListener('beforeunload', manejadorBeforeUnload);
        return () => window.removeEventListener('beforeunload', manejadorBeforeUnload);
    }, [juegoActivo, idPartida]);


    return (
        <>
            {/* arranca con mostrarConfig = true y renderiza <Config> */}
            {/* && = IF. Si es true, lee lo que continúa a su derecha, caso contrario corta ahí. Útil en vez de un IF tradicional, porque JSX no lo permite en medio de una etiqueta */}
            {mostrarConfig && !juegoActivo &&
                <Configuracion onGuardar={guardarConfig} />}
            <div id='zona-juego'>
                <Rosco estadoLetras={estadoLetras} indiceActual={indiceActual}>
                    {/* CHILDREN del Rosco */}
                    {/* si: el juego no comenzó */}
                    {!juegoActivo ? ( // IF
                        <BotonJugar onIniciar={iniciarJuego} /> // renderiza el botón de Jugar
                    ) : ( // ELSE: aparezca la definición aca
                        <InfoPalabra palabraActual={palabras[indiceActual]} mostrarAyuda={ajustesJuego.ayuda} /> // pasa como prop: palabra actual, la opción de ayuda de la config 
                    )
                    }
                </Rosco>
                <MejoresPartidas partidas={mejoresPartidas}/> {/* llama a la función utilizando la variable del state cómo parámetro */}
            </div>
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
            {resultadoPartida && (<ModalFinPartida resultado={resultadoPartida}
                onJugarDeNuevo={jugarDeNuevo} onVolverInicio={volverInicio} onIrRankings={irRankings} />)}
        </>
    )
}