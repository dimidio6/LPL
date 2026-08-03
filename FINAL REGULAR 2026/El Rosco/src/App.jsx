import { useState } from 'react';
import { Configuracion } from './config.jsx';
import { Rosco } from './rosco.jsx';

export function App () {

    const [mostrarConfig, setMostrarConfig] = useState(true); // state para mostrar/ocultar la Configuración
    const [ajustesJuego, setAjustesjuego] = useState(null); // state para guardar los datos de la partida

    // Función para que utilice el Componente 'Config' ESTA ES UNA FORMA DE Q EL COMPONENTE HIJO PASE DATOS HACIA ARRIBA, para APP
    const iniciarPartida = (datosConfiguracion) => {
        setAjustesjuego(datosConfiguracion);
        setMostrarConfig(false); // una vez inicia la partida oculta la configuración
        console.log("Partida iniciada. Ajustes: ", datosConfiguracion);
    }

    return(
        <>
            {/* arranca con mostrarConfig = true y renderiza <Config> */}
            {/* && = IF. Si es true, lee lo que continúa a su derecha, caso contrario corta ahí. Útil en vez de un IF tradicional, porque JSX no lo permite en medio de una etiqueta */}
            {mostrarConfig && <Configuracion onIniciar={iniciarPartida} />}
            <Rosco />
        </>
    )
}