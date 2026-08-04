// se encarga de mostrar las páginas

import { Routes, Route, Navigate } from 'react-router-dom';
import { Sesion } from './paginas/Inicio.jsx';
import { Partida } from './paginas/Juego.jsx';

export function App() {
    return (
        <>
            <header><u><h1>El Rosco</h1></u></header>
            <main>
                <Routes>
                    <Route path='/' element={<Sesion />}/>
                    <Route path='/juego' element={<Partida />}/>
                    <Route path='*' element={<Navigate to="/" />}/> {/* cualquier otra ruta manda a Sesion */}
                </Routes>
            </main>
        </>
    );
}