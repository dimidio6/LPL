document.addEventListener("DOMContentLoaded", () => { // espera a que el DOM esté completamente cargado

    const botonAgregar = document.getElementById("agregar_tarea"); // referencia al botón por su ID
    const botonTerminar = document.getElementById("terminar_tarea");
    const tarea = document.getElementById("input_tarea"); // tarea que ingresó el usuario}
    var pendientes = document.getElementById("tabla_pendientes");
    var terminadas = document.getElementById("tabla_terminadas");

    botonAgregar.addEventListener("click", () => { // defino que ocurre cuando ocurre el evento "click" en el botón
        let fila = document.createElement("tr"); // creo una fila
        fila.setAttribute("class","filas") // cada fila que creo la pongo en una clase
        let col1 = document.createElement("th"); // creo columna 1
        let col2 = document.createElement("th"); // creo columna 2
        let lab = document.createElement("label"); // label para insertar la tarea
        lab.setAttribute("for","finalizar");
        var finalizarTarea = document.createElement("input"); // creo un input
        finalizarTarea.setAttribute("type","checkbox"); // defino el input como checkbox
        finalizarTarea.setAttribute("id","finalizar");
        col1.appendChild(finalizarTarea); // agrego el checkbox a la primer columna
        lab.innerHTML = tarea.value; // inserto la tarea en el label
        col2.appendChild(lab); // agrego la tarea a la segunda columna
        fila.appendChild(col1);
        fila.appendChild(col2);
        // inserto la fila con sus 2 columnas en la tabla
        pendientes.appendChild(fila);
    })

    botonTerminar.addEventListener("click", () => {
        let casillas = document.querySelectorAll("input[type='checkbox']:checked"); // trae todos las casillas clicadas xD
        casillas.forEach(casilla => {
            console.log(casilla);
            let padre = casilla.parentNode.parentNode; // me devuelve la FILA (tr)
            pendientes.removeChild(padre);
            let fila_nueva = document.createElement("tr");
            fila_nueva.appendChild(padre.lastChild);
            terminadas.appendChild(fila_nueva);
        })
    })

    limpiar_tareas.addEventListener("click", () => {
        let pendi = document.getElementById("tabla_pendientes");
        while (pendi.children.length > 1) {
            console.log(pendi.children.length);
            pendi.removeChild(pendi.lastChild);
        }
        let termi = document.getElementById("tabla_terminadas");
        while (termi.children.length > 1) {
            termi.removeChild(termi.lastChild);
        }
    })
})