import './config.css'

export function Configuracion({ onGuardar }) { // recibe un componente de su padre (Juego)

    const handleConfig = async (e) => {
        e.preventDefault(); // para que la página no se recargue cuando se envía le formulario

        const formData = new FormData(e.target);
        const datosConfig = Object.fromEntries(formData);

        // Los checkbox en HTML devuelven "on" si están marcados
        // Lo convertimos a un booleano (true/false) para que sea más fácil de usar después.
        datosConfig.ayuda = formData.get('ayuda') === 'on';

        onGuardar(datosConfig); // utilizamos la función que le pasó Juego, para mandar hacia arriba como prop los datos de config.
    }

    return (
        <div id='overlay-config'>
            <dialog id='ajustes' open>
                <h2><u>Ajustes de la partida</u></h2>
                <form onSubmit={handleConfig}>
                    <div className='elementos-form'>
                        <label htmlFor='dificultad'>Dificultad de palabras</label>
                        <select id='dificultad' name='dificultad'>
                            <option value={'baja'}>Baja</option>
                            <option value={'media'}>Media</option>
                            <option value={'alta'}>Alta</option>
                        </select>
                    </div>
                    <div className='elementos-form'>
                        <fieldset className='tiempos'>
                            <legend>Tiempo de partida</legend>

                            <div className='opciones-tiempos'>
                                <label>
                                    <input type='radio' name='tiempo' value={'120'} defaultChecked/>
                                    2 minutos
                                </label>
                                <label>
                                    <input type='radio' name='tiempo' value={'180'}/>
                                    3 minutos
                                </label>
                                <label>
                                    <input type='radio' name='tiempo' value={'300'}/>
                                    5 minutos
                                </label>
                                <label>
                                    <input type='radio' name='tiempo' value={'0'}/>
                                    Sin límite
                                </label>
                            </div>
                        </fieldset>
                    </div>
                    <div className='elementos-form'>
                        <label id='label-ayuda'>
                            ¿Utilizar pistas?
                            <input type='checkbox' id='ayuda' name='ayuda'/>
                        </label>
                    </div>
                    <div className='elementos-form'>
                        <button id='boton-fin-config' type='submit'>Guardar</button>
                    </div>
                </form>
            </dialog>
        </div>
    )
}