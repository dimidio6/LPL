import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";

export function Estadisticas() {
    const [datos, setDatos] = useState(null); // null = todavía cargando

    const navegar = useNavigate();

    useEffect(() => {
        const traerEstadisticas = async () => {
            try {
                const respuesta = await fetch('http://localhost/el_rosco_backend/estadisticas/estadisticas.php');
                const resultado_estadisticas = await respuesta.json();
                if (resultado_estadisticas.success) {
                    setDatos(resultado_estadisticas);
                }
            } catch (error) {
                console.error("Error al traer estadísticas", error);
            }
        };
        traerEstadisticas();
    }, []); // Cuando carga la página dispara el useEffect

    if (!datos) {
        return <h1>Cargando estadísticas...</h1>;
    }

    return (
        <section id='contenedor-ranking'>
            <h1 id='titulo-estadisticas'>Estadísticas</h1>
            <article id='estadisticas'>

                <div className='bloque-estadistica'>
                    <h2>Jugador más ganador</h2>
                    {datos.jugador_mas_ganador ? (
                        <p>{datos.jugador_mas_ganador.nombre} — {datos.jugador_mas_ganador.victorias} victorias</p>
                    ) : (
                        <p>Todavía no hay partidas completadas.</p>
                    )}
                </div>

                <div className='bloque-estadistica'>
                    <h2>Mejor jugador por dificultad</h2>
                    <table className='tabla-estadistica'>
                        <thead>
                            <tr>
                                <th>Dificultad</th>
                                <th>Usuario</th>
                                <th>Victorias</th>
                            </tr>
                        </thead>
                        <tbody>
                            {datos.ganadores_por_dificultad.map((fila) => (
                                <tr key={fila.dificultad}>
                                    <td>{fila.dificultad}</td>
                                    <td>{fila.nombre}</td>
                                    <td>{fila.victorias}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div className='bloque-estadistica'>
                    <h2>Usuarios más rápidos</h2>
                    <table className='tabla-estadistica'>
                        <thead>
                            <tr>
                                <th>Usuario</th>
                                <th>Tiempo</th>
                                <th>Dificultad</th>
                                <th>Puntaje</th>
                            </tr>
                        </thead>
                        <tbody>
                            {datos.usuarios_mas_rapidos.map((fila, i) => (
                                <tr key={i}>
                                    <td>{fila.nombre}</td>
                                    <td>{fila.tiempo_partida} seg</td>
                                    <td>{fila.dificultad}</td>
                                    <td>{fila.puntaje}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div className='bloque-estadistica'>
                    <h2>Ranking general</h2>
                    <table className='tabla-estadistica'>
                        <thead>
                            <tr>
                                <th>Usuario</th>
                                <th>Puntaje</th>
                                <th>Dificultad</th>
                                <th>Tiempo</th>
                                <th>Ayuda</th>
                            </tr>
                        </thead>
                        <tbody>
                            {datos.ranking_general.map((fila, i) => (
                                <tr key={i}>
                                    <td>{fila.nombre}</td>
                                    <td>{fila.puntaje}</td>
                                    <td>{fila.dificultad}</td>
                                    <td>{fila.tiempo_partida} seg</td>
                                    <td>{Number(fila.ayuda) === 1 ? 'Sí' : 'No'}</td> {/* Por COMO viene de la BDD */}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </article>
            <button type="button" id='volver-inicio' onClick={() => navegar('/')}>Volver</button>
        </section>
    );
}