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
                    // console.log(nombre_producto);
                }
                else if (hijo.className == "precio") {
                    precio_producto = hijo.innerText;
                    // console.log(precio_producto);
                }
            })
            agregar_producto(nombre_producto, precio_producto);
        })
    });

    function agregar_producto(nombre, precio) {
        let tabla = document.getElementById("tabla_cuerpo"); // <tbody> de la tabla
        let filas = tabla.childNodes;
        console.log(filas);
        if (filas.length == 0) { // comprueba si el <tbody> está vacío
            console.log("crea tbody")
            let fila = document.createElement("tr");

            let col_produ = document.createElement("td"); // columna para el producto
            col_produ.setAttribute("class", nombre); // le asigno como nombre de su clase el mismo nombre del producto ej: <td class="Pantalon">Pantalon</td>
            let col_cant = document.createElement("td"); // columna para la cantidad
            let col_import = document.createElement("td"); // columna para el importe

            col_produ.innerText = nombre;

            let parrafo = document.createElement("p");
            parrafo.innerHTML = parseInt(1);
            col_cant.appendChild(parrafo);

            col_import.innerText = precio;
            // agrego las 3 columnas a la fila
            fila.appendChild(col_produ);
            fila.appendChild(col_cant);
            fila.appendChild(col_import);
            tabla.appendChild(fila); // agrego la fila al <tbody> de la tabla
        }
        else {
            filas.forEach(fila => {
                // console.log(fila);
                let columnas = fila.childNodes; // los hijos de la fila (o sea las columnas)
                    columnas.forEach(columna => { // itero sobre ellos
                        if (columna.className == nombre) { // si ya existe un Producto con el mismo nombre en la tabla
                            let col_cantidad = columna.nextElementSibling; // el hermano de la columna del producto (o sea la columna cantidad)
                            cantidad = col_cantidad.firstChild // le asigno su hijo (el párrafo dentro de la celda de cantidad)
                            console.log(col_cantidad);
                            console.log(cantidad);
                            console.log(cantidad.getAttribute("value"));
                            // parseInt(cantidad) = cantidad + 1;
                            // columna.nextSibling = columna.nextSibling + 1;
                        }
                    })
                })
        }
    }
})