import './juego.css';

export function Rosco({children}) { // recibe lo que está contenido dentro de él

    const abecedario = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'Ñ', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
    const radio = 180; // por si queremos agrandar o achicar el círculo. DEPENDIENTE DEL TAMAÑO DE SU CONTENEDOR (rosco.css -> rosco-circulo)

    return (
        <section className='rosco-contenedor'>
            <div className='rosco-circulo'>
                {/* .map nos devuelve cada letra del arreglo con su posición (cómo un for más avanzado) */}
                {abecedario.map((letra, posicion) => {
                    // nos dá el ángulo de cada letra para dibujarla en el rosco, independientemente de la cantidad de letras
                    const angulo = (360 / abecedario.length) * posicion;
                    const anguloCorregido = angulo - 90;
                    // la correción es necesaria, porque la posición de inicio deja a la letra apuntando a las "3" del reloj
                    // simplemente resto -90 al ángulo para que arranque desde las "12" del reloj
                    return ( // retorno la letra
                        // key = atributo de React para identificar de manera única un elemento de una lista
                        <div className='rosco-letra' key={posicion} style={
                            { transform: `rotate(${anguloCorregido}deg) translate(${radio}px) rotate(${-anguloCorregido}deg)`}
                        }> {/* estilizo acá porque depende de los cálculos matemáticos que obtengo en esta parte */}
                        {/* rotate ajusa el ángulo. translate lo empuja desde el centro hacia afuera. */}
                            {letra}
                        </div>
                    );
                })}
                {children}
            </div>
        </section>
    )
}