import './juego.css';

export function InfoPalabra({palabraActual, mostrarAyuda}) {

    if (!palabraActual) return null; // por si React quiere renderizar antes de tener la palabra

    const {letra, palabra, definicion, relacion} = palabraActual; // desestructuramos los datos que vienen de la BDD

    const textoRelacion = relacion === 'empieza' ? 'Empieza con ' : 'Contiene '; // IF-ELSE
    const guiones = Array(palabra.length).fill('_').join(' '); // crea un array vacío con la cantidad de letras de 'palabra'. fill: rellena cada hueco con un '_'. join: los une en un texto con un espacio entre cada caracter

    return(
        <div id="tarjeta-palabra">
            <p id="texto-definicion">{definicion}</p>
            <span id='palabra-relacion'>{textoRelacion} {letra}</span>
            {mostrarAyuda && (
                <div id='caja-ayuda'>
                    <span id='palabra-ayuda'>{palabra.length} letras</span>
                    <p>{guiones}</p>
                </div>
            )}
        </div>
    )
}