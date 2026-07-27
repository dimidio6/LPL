import { StrictMode } from 'react' // para comprobaciones (detectar problemas)
import { createRoot } from 'react-dom/client'
import './index.css'
import { Login } from './login.jsx'
// import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <header>
      <u><h1>El Rosco</h1></u>
    </header>
    <Login />
  </StrictMode>
)
