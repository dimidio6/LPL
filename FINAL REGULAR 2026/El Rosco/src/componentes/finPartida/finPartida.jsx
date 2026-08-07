import { useRef, useEffect } from 'react';
import './finPartida.css';

function mensajePuntaje(puntaje) { // if encadenados porque sirven mejor para rangos numéricos
    if (puntaje === 27) return "¡Excelente partida!!";
    if (puntaje >= 23) return "¡Muy bien!!";
    if (puntaje >= 19) return "¡Bien!";
    if (puntaje >= 15) return "Mmm... estuvo regular!";
    return "¡Qué mal!! A seguir estudiando!";
}


export function ModalFinPartida({ resultado, onJugarDeNuevo, onVolverInicio, onIrRankings }) {

    const dialogRef = useRef(null);

    useEffect(() => {
        if (resultado) {
            dialogRef.current?.showModal(); // abre el modal (activa el backdrop bloqueando todo lo demás)
        }
    }, [resultado]); // se setea resultado y se abre el modal

    if (!resultado) return null; // por seguridad

    const mensajeEstado = resultado.estado === 'completada'
        ? '¡Rosco completado!'
        : 'Se acabó el tiempo';

    return (
        <dialog id='caja-fin' ref={dialogRef}>
            <h2>{mensajeEstado}</h2>
            <h3 id='puntaje-fin'>{resultado.puntaje} puntos</h3>
            <p id='mensaje-fin'>{mensajePuntaje(resultado.puntaje)}</p>
            <p id='tiempo-fin'>Tiempo: {resultado.tiempo}seg</p>
            <div id='espacio-botones'>
                <button className='boton-fin' onClick={onJugarDeNuevo}>Jugar de nuevo</button>
                <button className='boton-fin' onClick={onVolverInicio}>Cerrar sesión</button>
                <button className='boton-fin' onClick={onIrRankings}>Ver Rankings</button>
            </div>
        </dialog>
    )
}