import './inicio.css';

export function Login({handleLogin}) {
    return (
        <article className="art-inicio-sesion">
            <h1>Inicio de sesión</h1>
            <div>
                <form name="fm-inicio-sesion" onSubmit={handleLogin}>
                    <label htmlFor="user_inicio">Usuario</label>
                    <input type="text" name="user_inicio" id="user_inicio" />
                    <label htmlFor="pass_inicio">Contraseña</label>
                    <input type="password" name="pass_inicio" id="pass_inicio" />
                    <button type="submit" name="submit_inicio">
                        Iniciar sesión
                    </button>
                </form>
            </div>
        </article>
    )
}