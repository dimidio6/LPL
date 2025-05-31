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

document.addEventListener("DOMContentLoaded", () => {

    // Carga las tareas del usuario_actual
    // tabla_pendientes.innerHTML = localStorage.getItem("listado_pen_"+getCookie("usuario_actual"));
    // tabla_iniciadas.innerHTML = localStorage.getItem("listado_ini_"+getCookie("usuario_actual"));
    // tabla_terminadas.innerHTML = localStorage.getItem("listado_fin_"+getCookie("usuario_actual"));
    /////////////////////////////////////////////////////////////////////////////////////////////////
    // Decidí comentar el guardado de las tareas en LocalStorage ya que al cargarlas cuando un usuario ingresa de nuevo, --
    // -- no me permitía volver a operar sobre ellas (ni agregar tareas, ni limpiarlas, ni cambiarlas de estado) --
    // -- (Probablemente me falto convertirles correctamente cuando las bajo para poder volver a operar con ellas), no llegue con tiempo

    agregar_tarea.addEventListener("click", () => { // defino que ocurre cuando ocurre el evento "click" en el botón
        let fila = document.createElement("tr"); // creo una fila
        fila.setAttribute("class", "filas") // cada fila que creo la pongo en una clase
        let col1 = document.createElement("td"); // creo columna 1
        let col2 = document.createElement("td"); // creo columna 2
        let lab = document.createElement("label"); // label para insertar la tarea
        lab.setAttribute("for", "finalizar");
        var finalizarTarea = document.createElement("input"); // creo un input
        finalizarTarea.setAttribute("type", "checkbox"); // defino el input como checkbox
        finalizarTarea.setAttribute("id", "finalizar");
        col1.appendChild(finalizarTarea); // agrego el checkbox a la primer columna
        lab.innerHTML = input_tarea.value; // inserto la tarea del input id="input_tarea" en el label
        col2.appendChild(lab); // agrego la tarea a la segunda columna
        fila.appendChild(col1);
        fila.appendChild(col2);
        // inserto la fila con sus 2 columnas en la tabla
        tabla_pendientes.appendChild(fila); // agrega la fila a mi tabla id = "tabla_pendientes"
        // Actualizo cookie cantidad de tareas pendientes
        let tareas_pendientes = getCookie("tarea_pen_" + getCookie("usuario_actual")); // trae las tareas pendientes del user actual
        tareas_pendientes = parseInt(tareas_pendientes) + 1; // incrementa el contador
        setCookie("tarea_pen_" + getCookie("usuario_actual"), 3600, parseInt(tareas_pendientes)); // las vuelve a guardar
        // Guardo las tareas en LocalStorage
        // localStorage.setItem("listado_pen_"+getCookie("usuario_actual"),tabla_pendientes.outerHTML);
    })

    iniciar_tarea.addEventListener("click", () => {
        let casillas = tabla_pendientes.querySelectorAll("input[type='checkbox']:checked"); // trae todos las casillas clicadas
        casillas.forEach(casilla => {
            let padre = casilla.parentNode.parentNode; // me devuelve la FILA (tr) entera de la casilla correspondiente
            tabla_pendientes.removeChild(padre);
            let fila_nueva = document.createElement("tr");
            let columna1 = document.createElement("td");
            let columna2 = document.createElement("td");

            let nueva_casilla = document.createElement("input");
            nueva_casilla.setAttribute("type", "checkbox"); // defino el input como checkbox

            columna1.appendChild(nueva_casilla); // casilla como 1er columna
            columna2.appendChild(padre.lastChild); // ultimo hijo de la fila anterior (casilla) como 2da columna

            fila_nueva.appendChild(columna1);
            fila_nueva.appendChild(columna2);
            // me tomo el trabajo de crear cada columna de la fila de nuevo en lugar de pasar la fila directamente, para --
            // -- que la casilla no pase como "checked" (o sea tildada), y pase vacía.
            tabla_iniciadas.appendChild(fila_nueva);
            // Actualizo cookie cantidad de tareas iniciadas
            let tareas_iniciadas = getCookie("tarea_ini_" + getCookie("usuario_actual")); // trae las tareas iniciadas del user actual
            tareas_iniciadas = parseInt(tareas_iniciadas) + 1; // incrementa el contador
            setCookie("tarea_ini_" + getCookie("usuario_actual"), 3600, parseInt(tareas_iniciadas)); // las vuelve a guardar
            // Guardo las tareas en LocalStorage
            // localStorage.setItem("listado_ini_"+getCookie("usuario_actual"),tabla_iniciadas.outerHTML);
        })
    })

    terminar_tarea.addEventListener("click", () => {
        let casillas = tabla_iniciadas.querySelectorAll("input[type='checkbox']:checked");
        casillas.forEach(casilla => {
            let padre = casilla.parentNode.parentNode;
            tabla_iniciadas.removeChild(padre);
            let fila_nueva = document.createElement("tr");
            fila_nueva.appendChild(padre.lastChild); // como no quiero poner un check en la nueva fila, únicamente agrego la tarea (el último hijo de la fila)
            tabla_terminadas.appendChild(fila_nueva);
            // Actualizo cookie cantidad de tareas finalizadas
            let tareas_finalizadas = getCookie("tarea_fin_" + getCookie("usuario_actual")); // trae las tareas finalizadas del user actual
            tareas_finalizadas = parseInt(tareas_finalizadas) + 1; // incrementa el contador
            setCookie("tarea_fin_" + getCookie("usuario_actual"), 3600, parseInt(tareas_finalizadas)); // las vuelve a guardar
            // Guardo las tareas en LocalStorage
            // localStorage.setItem("listado_fin_"+getCookie("usuario_actual"),tabla_terminadas.outerHTML);
        })
    })

    limpiar_tareas.addEventListener("click", () => {
        let pendi = document.getElementById("tabla_pendientes");
        while (pendi.children.length > 1) {
            // console.log(pendi.children.length);
            pendi.removeChild(pendi.lastChild);
        }
        let ini = document.getElementById("tabla_iniciadas");
        while (ini.children.length > 1) {
            ini.removeChild(ini.lastChild);
        }
        let termi = document.getElementById("tabla_terminadas");
        while (termi.children.length > 1) {
            termi.removeChild(termi.lastChild);
        }
        // Actualizo cookies
        setCookie("tarea_pen_" + getCookie("usuario_actual"), 3600, "0");
        setCookie("tarea_ini_" + getCookie("usuario_actual"), 3600, "0");
        setCookie("tarea_fin_" + getCookie("usuario_actual"), 3600, "0");
    })

})