import './finPartida.css';

export function ModaFinPartida({ resultado, onJugarDeNuevo, onVolverInicio, onIrRankings }) {
    if (!resultado) return null; // por seguridad

    const mensajeEstado = resultado.estado === 'completada'
        ? '¡Rosco completado!'
        : 'Se acabó el tiempo';

    return (
        <dialog open>
            <h2>{mensajeEstado}</h2>
            <div id='botones-fin'>
                <button onClick={}></button>
                <button onClick={}></button>
                <button onClick={}></button>
            </div>
        </dialog>
    )
}