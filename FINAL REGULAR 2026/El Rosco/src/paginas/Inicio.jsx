import { useNavigate } from "react-router-dom";
import { Login } from "../componentes/autenticacion/login";
import { Registro } from "../componentes/autenticacion/registro";

export function Sesion() {

    const navegar = useNavigate();

    /// funciones para manejar los eventos
    // MANEJADOR DEL REGISTRO
    const handleRegistro = async (e) => {
        e.preventDefault(); // para que la página no se recargue cuando se envía le formulario

        const formData = new FormData(e.target); // JavaScript recolecta toda la info del formulario, pero en un formato ilegíble
        const datosRegistro = Object.fromEntries(formData); // Object.fromEntries lo transforma a un Objeto JavaScript legíble y manipulable. Permite acceder a lo que se completó en cada input con "." y el name

        try {
            const respuesta_registro = await fetch('http://localhost/el_rosco_backend/registro.php', { // se comunica con el PHP (registro)
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(datosRegistro)
            });

            const resultado_registro = await respuesta_registro.json();

            if (resultado_registro.status === 'success') {
                navegar('/juego'); // si el registro es exitoso dirige al juego
            } else {
                alert(resultado_registro.mensaje); // si falla muestra el error
            }
        } catch (error) {
            console.error(error);
        }
    };

    // MANEJADOR DEL LOGIN
    const handleLogin = async(e) => {
        e.preventDefault(); // para que la página no se recargue cuando se envía el formulario

        const formData = new FormData(e.target);
        const datosLogin = Object.fromEntries(formData);

        try {
            const respuesta_login = await fetch('http://localhost/el_rosco_backend/login.php', { // se comunica con el PHP (login)
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(datosLogin)
            });

            const resultado_login = await respuesta_login.json();

            // .status, .datos_user, etc.. son sacados directamente del json_encode del login.php
            if (resultado_login.status === 'success') {
                console.log("Datos del usuario:", resultado_login.datos_user);
                navegar('/juego'); // si el logeo es exitoso dirige al juego
                //////////////////////////////////////////////
                // ACÁ PUEDEN IR COOKIES, LOCALSTORAGE.. ETC..
                //////////////////////////////////////////////
            } else {
                alert(resultado_login.mensaje);
            }
        } catch (error) {
            console.error(error);
        }
    }

    // PARTE VISUAL QUE RENDERIZARÁ
    return (
        <section>
            {/* LOS DATOS DE LOS FORM VIENEN COMO PROP PARA SUS MANEJADORES */}
            <Login handleLogin={handleLogin}/> 
            <Registro handleRegistro={handleRegistro}/> 
            <h3>Rankings</h3>
        </section>
    );
};
