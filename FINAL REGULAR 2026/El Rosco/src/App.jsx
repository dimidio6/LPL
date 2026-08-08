// se encarga de mostrar las páginas

import { Routes, Route, Navigate } from 'react-router-dom';
import { Sesion } from './paginas/Inicio.jsx';
import { Partida } from './paginas/Juego.jsx';
import { Estadisticas } from './paginas/Rankings.jsx';
import { RutaProtegida } from './componentes/autenticacion/rutas.jsx';

export function App() {
    return (
        <>
            <header><u><h1>El Rosco</h1></u></header>
            <main>
                <Routes>
                    <Route path='/' element={<Sesion />}/>
                    <Route element={<RutaProtegida />}>
                        <Route path='/juego' element={<Partida />}/> {/* antes de renderizar pasa por el chequeo de RutaProtegida */}
                    </Route>
                    <Route path='/rankings' element={<Estadisticas />}/>
                    <Route path='*' element={<Navigate to="/" />}/> {/* cualquier otra ruta manda a Sesion */}
                </Routes>
            </main>
        </>
    );
}