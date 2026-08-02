import { StrictMode } from 'react' // para comprobaciones (detectar problemas)
import { createRoot } from 'react-dom/client'
import { Sesion } from './inicio.jsx'
// import App from './App.jsx'
import { Rosco } from './rosco.jsx'
import './index.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <header>
      <u><h1>El Rosco</h1></u>
    </header>
    {/* <Sesion /> */}
    <Rosco/>
  </StrictMode>
)
