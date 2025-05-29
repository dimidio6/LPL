document.addEventListener("DOMContentLoaded", () => {

    var catalogo = document.getElementById("catalogo");
    var botones = document.querySelectorAll("button[class='agregar_prenda']");
    // console.log(botones)

    botones.forEach(boton => {
        boton.addEventListener("click", function () {
            var nombre_producto;
            var precio_producto;
            let padre = boton.parentNode;
            // console.log(padre);
            let hijos = padre.childNodes; // me trae los hijos del div en una lista
            // console.log(hijos);
            hijos.forEach(hijo => {
                if (hijo.className == "producto") {
                    nombre_producto = hijo.innerText;
                    console.log(nombre_producto);
                }
                else if (hijo.className == "precio") {
                    precio_producto = hijo.innerText;
                    console.log(precio_producto);
                }
            })
            agregar_producto(nombre_producto,precio_producto);
        })
    });

    function agregar_producto (nombre, precio) {
       let tabla = document.getElementById("tabla");
       let fila = document.createElement("tr");
       let col1 = document.createElement("td");
       let col2 = document.createElement("td");
       let col3 = document.createElement("td");
       col1.innerText = nombre;
       col1.className = "clase"+nombre; // a cada elemento que agrego en "Producto" le asigno una clase "clase_<nombre del producto>"
       col3.innerText = precio;
       fila.appendChild(col1);
    //    fila.appendChild(col2); // falta hacer el contador
       fila.appendChild(col3);
       tabla.appendChild(fila);
    }
})