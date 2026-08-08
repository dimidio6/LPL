import { useState, useEffect } from 'react';
import { Navigate, Outlet } from 'react-router-dom';

// Esta función asegura que haya un usuario logeado (verificando con la cookie)
// Para que las páginas que esten dentro (en su instanciación) puedan accederse sólo si se comprobó que hay usuario logeado

export function RutaProtegida() {
    const [autenticado, setAutenticado] = useState(null); // null = todavía verificando

    useEffect(() => {
        const verificar = async () => {
            try {
                const respuesta = await fetch('http://localhost/el_rosco_backend/autenticacion/verificar_sesion.php', {
                    credentials: 'include' // manda la cookie para que PHP la lea
                });
                const datos = await respuesta.json();
                setAutenticado(datos.autenticado);
            } catch (error) {
                console.error("Error al verificar sesión", error);
                setAutenticado(false);
            }
        };
        verificar();
    }, []);

    if (autenticado === null) {
        return <p>Cargando...</p>; // para un Cargando antes de que lo derive a otro lado
    }
    // Outler renderiza la ruta hija que corresponda
    return autenticado ? <Outlet /> : <Navigate to="/" replace />;
}