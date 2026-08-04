import { useState, useEffect } from 'react';
import { Configuracion } from '../componentes/config/config.jsx';
import { Rosco } from '../componentes/rosco/rosco.jsx';
import { BotonJugar } from '../componentes/rosco/botonJugar.jsx';

export function Partida () {

    // useState devuelve [estado actual(cómo el estado inicial seteado, ej: true en mostrarConfig), set..Algo: que permite actualizar el estado(función)]
    const [mostrarConfig, setMostrarConfig] = useState(true); // state para mostrar/ocultar la Configuración
    const [ajustesJuego, setAjustesjuego] = useState(null); // state para guardar los datos de la partida

    const [tiempoRestante, setTiempoRestante] = useState(0); // tiempo de partida (inicializado en 0)
    const [palabras, setPalabras] = useState([]); // inicializa un array vacío para las palabras
    const [cargando, setCargando] = useState(false); // cómo pantalla de carga para cuando haga la consulta a la BDD

    // para arrancar el juego
    const [juegoActivo, setJuegoActivo] = useState(false);

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
        console.log(juegoActivo)
    }

    // function iniciarJuego() {
    //     setJuegoActivo(true); // señal de largada: el botón de inicio fue presionado
    //     console.log(juegoActivo);
    //     alert("HOLA");
    // }

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
                    clearIntervalo(intervalo); // apagamos el reloj para que deje de actualizarse del ID = intervalo
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

    return(
        <>
            {/* arranca con mostrarConfig = true y renderiza <Config> */}
            {/* && = IF. Si es true, lee lo que continúa a su derecha, caso contrario corta ahí. Útil en vez de un IF tradicional, porque JSX no lo permite en medio de una etiqueta */}
            {mostrarConfig && <Configuracion onGuardar={guardarConfig} />}
            <Rosco>
                {/* CHILDREN del Rosco */}
                {/* si: el juego no comenzó */}
                {!juegoActivo ? ( // IF
                    <BotonJugar onIniciar={iniciarJuego}/> // renderiza el botón de Jugar
                ) : // ELSE
                    <div id='tiempo'>
                        <h2>Tiempo: {tiempoRestante}</h2>
                    </div>
                }
            </Rosco>
        </>
    )
}