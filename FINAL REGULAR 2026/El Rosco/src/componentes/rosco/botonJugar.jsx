import './juego.css';

export function BotonJugar({onIniciar}) {
    return (
        <>
            <button type='button' id='boton-jugar' onClick={onIniciar}>JUGAR</button>
        </>
    )
}