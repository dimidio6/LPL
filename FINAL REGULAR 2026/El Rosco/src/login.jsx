import './login.css'

export function Login() {
    return (
        <section>
            <article className='art-inicio-sesion'>  
                <h1>Inicio de sesión</h1>
                <div>
                    <form name='fm-inicio-sesion' method='post'>
                        <label for='user_inicio'>Usuario</label>
                        <input type='text' name="user_inicio"/>
                        <label for='pass_inicio'>Contraseña</label>
                        <input type='password' name="pass_inicio"/>
                        <button type='submit' name='submit_inicio'>Iniciar sesión</button>
                    </form>
                </div>
            </article>
            <article className='art-registro'>
                <h1>Registrarse</h1>
                <div>
                    <form name='fm-registro' method='post'>
                        <label for='user_registro'>Usuario</label>
                        <input type='text' name='user_registro'/>
                        <label for='pass_registro'>Contraseña</label>
                        <input type='password' name='pass_registro'/>
                        <label for='correo'>Correo electrónico</label>
                        <input type='email' name='correo'/>
                        <label for='fecha_nac'>Fecha de nacimiento</label>
                        <input type='date' name='fecha_nac' id='input-fecha_nac'/>
                        <button type='submit' name='submit_registro'>Registrarse</button>
                    </form>
                </div>
            </article>
            <h3>Rankings</h3>
        </section>
    );
}
