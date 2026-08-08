import './juego.css';

export function MejoresPartidas ({partidas}) {
    return (
        <div id='mejores-partidas'>
            <h3>Tus mejores partidas</h3>
            <table id='tabla-partidas'>
                <thead>
                    <tr>
                        <th>Puntaje</th>
                        <th>Dificultad</th>
                        <th>Ayuda</th>
                        <th>Tiempo</th>
                    </tr>
                </thead>
                <tbody>
                    {partidas.map((p) => (
                        <tr key={p.id_partida}>
                            <td>{p.puntaje}</td>
                            <td>{p.dificultad}</td>
                            <td>{Number(p.ayuda) === 1 ? 'Sí' : 'No'}</td>{/* convierte el 1/0 traído de la BDD */}
                            <td>{p.tiempo_partida}seg</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}