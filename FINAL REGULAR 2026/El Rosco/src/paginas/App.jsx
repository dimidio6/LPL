import { useState, useEffect } from 'react';
import { Configuracion } from '../componentes/config/config.jsx';
import { Rosco } from '../componentes/rosco/rosco.jsx';
import { BotonJugar } from '../componentes/rosco/botonJugar.jsx';

export function App () {

    // useState devuelve [estado actual(cómo el estado inicial seteado, ej: true en mostrarConfig), set..Algo: que permite actualizar el estado(función)]
    const [mostrarConfig, setMostrarConfig] = useState(true); // state para mostrar/ocultar la Configuración
    const [ajustesJuego, setAjustesjuego] = useState(null); // state para guardar los datos de la partida

    const [tiempoRestante, setTiempoRestante] = useState(0); // tiempo de partida (inicializado en 0)
    const [palabras, setPalabras] = useState([]); // inicializa un array vacío para las palabras
    const [cargando, setCargando] = useState(false); // cómo pantalla de carga para cuando haga la consulta a la BDD

    // Función para que utilice el Componente 'Config' ESTA ES UNA FORMA DE Q EL COMPONENTE HIJO PASE DATOS HACIA ARRIBA, para APP
    const iniciarPartida = (datosConfiguracion) => {
        setAjustesjuego(datosConfiguracion); // setea los datos de configuración
        setMostrarConfig(false); // una vez inicia la partida oculta la configuración
        console.log("Partida iniciada. Ajustes: ", datosConfiguracion);
    }

    // useEffect -> (configuración (función con la lógica del Efecto), dependencias (valores que al actualizarse ejecuten el Efecto))
    useEffect(() => {
        if (!ajustesJuego) { // si sigue seteado en null (o sea no se ejecutó iniciarPartida y el modal sigue abierto)
            return; // no hace nada
        }
        const iniciarJuego = async () => {
            setCargando(true); // cargando... (por que va a buscar las palabras)
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
                setCargando(false); // terminó de traer las palabras
            }
        }

        iniciarJuego();
    }, [ajustesJuego]); // ajustesJuego -> dependencia, cuando cambie se ejecuta useEffect()

    return(
        <>
            {/* arranca con mostrarConfig = true y renderiza <Config> */}
            {/* && = IF. Si es true, lee lo que continúa a su derecha, caso contrario corta ahí. Útil en vez de un IF tradicional, porque JSX no lo permite en medio de una etiqueta */}
            {mostrarConfig && <Configuracion onIniciar={iniciarPartida} />}
            <Rosco />
            <BotonJugar/>
        </>
    )
}