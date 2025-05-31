function getCookie(nombreCookie) {
    let cookies = document.cookie;
    let pos = cookies.search(nombreCookie + "=");
    if (pos === -1) {
        return "";
    } else {
        let principio = pos + nombreCookie.length + 1;
        let fin = cookies.indexOf(";", principio);
        if (fin === -1) {
            fin = cookies.length;
        }
        return cookies.substring(principio, fin);
    }
}

function setCookie(nombre, tiempo, valor) {
    let nombreCookie = nombre
    let tiempoCookie = tiempo
    let valorCookie = valor

    document.cookie = nombreCookie + "=" + valorCookie + "; max-age=" + tiempoCookie;
}

function creo_boton() {
    var texto_gestionar = document.getElementById("texto_gestionar");
    var gestionar = document.getElementById("gestionar");
    if (texto_gestionar.innerHTML == "") { // para asegurarme de crear el botón 1 sola vez
        console.log("creación de botón");
        texto_gestionar.innerHTML = "      ";
        var nuevo_boton = document.createElement("button");
        nuevo_boton.setAttribute("type", "button");
        nuevo_boton.setAttribute("id", "button_gestionar");
        nuevo_boton.setAttribute("onclick", "ir_tareas()");
        nuevo_boton.innerText = "Gestionar tareas";
        gestionar.appendChild(nuevo_boton);
    }
    else (
        console.log("botón ya creado")
    )
}

function ir_tareas() { // dirige hacia la página de las tareas
    window.location.href = "./tareas.html";
}

document.addEventListener("DOMContentLoaded", () => {

    button_ingreso.addEventListener("click", () => {
        if (input_user.value != "") { // valido que no ingrese espacio en blanco

            if (getCookie("usuario_" + input_user.value)) { // si el usuario ya habia ingresado
                console.log("usuario ya ingresado");
                // bajo todas las cookies de sus tareas
                let cant_pen = getCookie("tarea_pen_" + input_user.value);
                let cant_ini = getCookie("tarea_ini_" + input_user.value);
                let cant_fin = getCookie("tarea_fin_" + input_user.value);
                // Mensaje de Bienvenida (otra vez) //
                titulo_visitas.innerHTML = "Hola " + input_user.value + "!! Tenes " + cant_pen + " tareas pendientes, " + cant_ini + " tareas iniciadas y " + cant_fin + " finalizadas"

            } else { // si nunca habia ingresado
                console.log("nuevo usuario");
                // inicializo todas las tareas del usuario en 0
                setCookie("tarea_pen_" + input_user.value, 3600, "0") // cookie tareas pendientes del usuario específico
                setCookie("tarea_ini_" + input_user.value, 3600, "0") // cookie tareas iniciadas del usuario específico
                setCookie("tarea_fin_" + input_user.value, 3600, "0") // cookie tareas finalizadas del usuario específico
                // Mensaje de Bienvenida //
                titulo_visitas.innerHTML = "Hola " + input_user.value + " es tu primera vez en el gestor de tareas"
            }
            setCookie("usuario_" + input_user.value, 3600, input_user.value); // crea una cookie por cada usuario
            setCookie("usuario_actual", 3600, input_user.value); // actualiza la cookie de usuario actual
        }

        creo_boton() // cuando ingresa el usuario genero el botón dinamicamente
    })

})