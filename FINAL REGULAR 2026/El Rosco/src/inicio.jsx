import "./inicio.css";

export function Sesion() {

    /// funciones para manejar los eventos
    // MANEJADOR DEL REGISTRO
    const handleRegistro = async (e) => {
        e.preventDefault(); // para que la página no se recargue cuando se envía le formulario

        const formData = new FormData(e.target);
        const datosRegistro = Object.fromEntries(formData);

        try {
            const respuesta_registro = await fetch('http://localhost/el_rosco_backend/registro.php', { // se comunica con el PHP (registro)
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(datosRegistro)
            });

            const resultado_registro = await respuesta_registro.json();

            alert(resultado_registro.mensaje);
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

    // PARTE VISUAL QUE RENDERIZARA
    return (
        <section>
            <article className="art-inicio-sesion">
                <h1>Inicio de sesión</h1>
                <div>
                    <form name="fm-inicio-sesion" onSubmit={handleLogin}>
                        <label htmlFor="user_inicio">Usuario</label>
                        <input type="text" name="user_inicio" id="user_inicio"/>
                        <label htmlFor="pass_inicio">Contraseña</label>
                        <input type="password" name="pass_inicio" id="pass_inicio"/>
                        <button type="submit" name="submit_inicio">
                            Iniciar sesión
                        </button>
                    </form>
                </div>
            </article>
            <article className="art-registro">
                <h1>Registrarse</h1>
                <div>
                    <form name="fm-registro" onSubmit={handleRegistro}> {/* cuando mando el form, lo dirige a su manejador */}
                        <label htmlFor="user_registro">Usuario</label>
                        <input type="text" name="user_registro" id="user_registro"/>
                        <label htmlFor="pass_registro">Contraseña</label>
                        <input type="password"name="pass_registro" id="pass_registro"/>
                        <label htmlFor="correo">Correo electrónico</label>
                        <input type="email" name="correo" id="correo"/>
                        <label htmlFor="fecha_nac">Fecha de nacimiento</label>
                        <input type="date" name="fecha_nac" id="fecha_nac" />
                        <button type="submit" name="submit_registro">
                            Registrarse
                        </button>
                    </form>
                </div>
            </article>
            <h3>Rankings</h3>
        </section>
    );
};
