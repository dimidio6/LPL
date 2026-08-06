import { useState, useEffect } from 'react';
import { Configuracion } from '../componentes/config/config.jsx';
import { Rosco } from '../componentes/rosco/rosco.jsx';
import { BotonJugar } from '../componentes/rosco/botonJugar.jsx';
import { InfoPalabra } from '../componentes/rosco/tarjetaPalabra.jsx';

export function Partida() {

    // useState devuelve [estado actual(cómo el estado inicial seteado, ej: true en mostrarConfig), set..Algo: que permite actualizar el estado(función)]
    const [mostrarConfig, setMostrarConfig] = useState(true); // state para mostrar/ocultar la Configuración
    const [ajustesJuego, setAjustesjuego] = useState(null); // state para guardar los datos de la partida

    const [tiempoRestante, setTiempoRestante] = useState(0); // tiempo de partida (inicializado en 0)
    const [palabras, setPalabras] = useState([]); // inicializa un array vacío para las palabras
    const [cargando, setCargando] = useState(false); // cómo pantalla de carga para cuando haga la consulta a la BDD

    // para arrancar el juego
    const [juegoActivo, setJuegoActivo] = useState(false);

    // Lógica del Rosco
    const [estadoLetras, setEstadoLetras] = useState([]); // Array para guardar el estado de cada letra (correcta, pendiente, etc..)
    const [indiceActual, setIndiceActual] = useState(0); // para saber por cuál palabra va (ya que están en un array)
    const [respuesta, setRespuesta] = useState(""); // Respuesta del usuario en el input

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

    const iniciarJuego = () => {
        setJuegoActivo(true); // señal de largada: el botón de inicio fue presionado
    }

    // CRONÓMETRO
    useEffect(() => {
        if (!juegoActivo || ajustesJuego.tiempo === '0') {
            return;
        }
        // setInterval ejecuta: (función, cada cierto tiempo en ms).
        // esto el navegador lo devuelve en un ID que lo guardamos en la const 'intervalo'
        const intervalo = setInterval(() => {
            setTiempoRestante((tiempoAnterior) => { // ejecuta setTiempoRestante
                if (tiempoAnterior < 1) { // si se acaba el tiempo
                    clearInterval(intervalo); // apagamos el reloj para que deje de actualizarse del ID = intervalo
                    setJuegoActivo(false); // cambia el estado del juegoActivo
                    alert("Se acabó el tiempo.");
                    return 0;
                }
                return tiempoAnterior - 1; // va disminuyendo en 1 el contador
            })
        }, 1000); // cada 1000ms = 1seg

        // CAMBIAR ESTO DESPUÉSSS /////////////////////////////////////////////////////////////// (QUE NO SE APAGUE)
        return () => clearInterval(intervalo); // para apagar el reloj si salimos de la pantalla
    }, [juegoActivo, ajustesJuego]); // dependencias del useEffect

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