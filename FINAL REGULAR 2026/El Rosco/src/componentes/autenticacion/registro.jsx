import './inicio.css';

export function Registro({handleRegistro}) {
    return (
        <article className="art-registro">
            <h1>Registrarse</h1>
            <div>
                <form name="fm-registro" onSubmit={handleRegistro}> {/* cuando mando el form, lo dirige a su manejador */}
                    <label htmlFor="user_registro">Usuario</label>
                    <input type="text" name="user_registro" id="user_registro" />
                    <label htmlFor="pass_registro">Contraseña</label>
                    <input type="password" name="pass_registro" id="pass_registro" />
                    <label htmlFor="correo">Correo electrónico</label>
                    <input type="email" name="correo" id="correo" />
                    <label htmlFor="fecha_nac">Fecha de nacimiento</label>
                    <input type="date" name="fecha_nac" id="fecha_nac" />
                    <button type="submit" name="submit_registro">
                        Registrarse
                    </button>
                </form>
            </div>
        </article>
    )
}