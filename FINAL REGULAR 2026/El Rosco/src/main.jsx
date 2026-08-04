// prepara todas las herramientas de React y el enrutador para las distintas páginas

import ReactDOM from 'react-dom/client'; // La Librería de React que renderiza los componentes para navegador
import {StrictMode} from 'react'; // para comprobaciones (detectar problemas)
import {BrowserRouter} from 'react-router-dom';

import {App} from './App.jsx';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render( // crea una raíz para el nodo del DOM. Me permite renderizar componentes React dentro del DOM
  <StrictMode>
    <BrowserRouter>
      <App/>
    </BrowserRouter>
  </StrictMode>
);
