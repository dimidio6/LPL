import ReactDOM from 'react-dom/client'; // La Librería de React que renderiza los componentes para navegador
import {StrictMode} from 'react'; // para comprobaciones (detectar problemas)
import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom';

import {Sesion} from './inicio.jsx';
import {App} from './App.jsx';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render( // crea una raíz para el nodo del DOM. Me permite renderizar componentes React dentro del DOM
  <StrictMode>
    <BrowserRouter>
      <header><u><h1>El Rosco</h1></u></header>
      <Routes>
        <Route path='/' element={<Sesion/>}/>
        <Route path='/juego' element={<App/>}/>
        <Route path='*' element={<Navigate to="/" />}/> {/* cualquier otra ruta manda a Sesion */}
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
