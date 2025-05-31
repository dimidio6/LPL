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
    var catalogo = document.getElementById("catalogo");
    var botones = document.querySelectorAll("button[class='agregar_prenda']");
    // console.log(botones)

    // carga la tabla con el carrito guardado en LocalStorage
    carrito_usuario.innerHTML = getCookie("usuario_actual") // Pone el nombre del usuario actual al lado del H2 de Carrito
    tabla_cuerpo.innerHTML = localStorage.getItem("carrito_"+getCookie("usuario_actual")); // creo un carrito por cada usuario
    total_carrito.innerHTML = localStorage.getItem("total_carrito_"+getCookie("usuario_actual")); // creo un total por cada usuario

    botones.forEach((boton) => {
        boton.addEventListener("click", function () {
            var nombre_producto;
            var precio_producto;
            let padre = boton.parentNode;
            // console.log(padre);
            let hijos = padre.childNodes; // me trae los hijos del div en una lista
            // console.log(hijos);
            hijos.forEach((hijo) => {
                if (hijo.className == "producto") {
                    nombre_producto = hijo.innerText;
                    // console.log(nombre_producto);
                } else if (hijo.className == "precio") {
                    precio_producto = hijo.innerText;
                    console.log(hijo.innerText);
                    // console.log(precio_producto);
                }
            });
            agregar_producto(nombre_producto, precio_producto);
        });
    });

    function agregar_producto(nombre, precio) {
        let tabla = document.getElementById("tabla_cuerpo"); // <tbody> de la tabla
        let filas = tabla.childNodes;
        let producto_ingresado = false; // booleano para saber si ya se ingresó el producto
        // console.log(filas);
        filas.forEach((fila) => {
            // itero entre cada fila del tbody
            let columnas = fila.childNodes;
            // console.log(columnas);
            columnas.forEach((columna) => {
                // itero entre las columnas para buscar la de Producto
                if (columna.className == nombre) {
                    // si el producto ya fue ingresado al tbody
                    producto_ingresado = true;
                }
            });
        });
        if (!producto_ingresado) {
            // comprueba si no se ingreso el producto y crea la fila y las columnas
            console.log("nuevo producto");
            let fila = document.createElement("tr");

            let col_produ = document.createElement("td"); // columna para el producto
            col_produ.setAttribute("class", nombre); // le asigno como nombre de su clase el mismo nombre del producto ej: <td class="Pantalon">Pantalon</td>
            let col_cant = document.createElement("td"); // columna para la cantidad
            let col_import = document.createElement("td"); // columna para el importe

            col_produ.innerText = nombre;

            let parrafo = document.createElement("p");
            parrafo.innerHTML = parseInt(1);
            col_cant.appendChild(parrafo);

            // lo que viene en el precio como por ej: $100, lo separo en $, y 100.
            let moneda = document.createElement("label");
            moneda.setAttribute("id", "moneda"); // para manejarlo desde el CSS
            moneda.innerText = precio.substring(0, 1);
            let numero = document.createElement("span");
            numero.innerText = precio.substring(1);
            col_import.appendChild(moneda);
            col_import.appendChild(numero);

            // agrego las 3 columnas a la fila
            fila.appendChild(col_produ);
            fila.appendChild(col_cant);
            fila.appendChild(col_import);
            tabla.appendChild(fila); // agrego la fila al <tbody> de la tabla
            
            precio_viejo = parseInt(localStorage.getItem("total_carrito_"+getCookie("usuario_actual")));
            precio_viejo = isNaN(precio_viejo) ? 0 : precio_viejo; // Si precio_viejo es NAN le asigna 0, sino el numero del precio total del carrito guardado
            precio_viejo += parseInt(precio.substring(1));
            localStorage.setItem("total_carrito_"+getCookie("usuario_actual"), precio_viejo);
            total_carrito.innerHTML = precio_viejo;
            
        } else {
            // si el Producto ya fue insertado en la fila sólo aumenta el contador
            filas.forEach((fila) => {
                // console.log(fila);
                let columnas = fila.childNodes; // los hijos de la fila (o sea las columnas)
                columnas.forEach((columna) => {
                    // itero sobre ellos
                    if (columna.className == nombre) {
                        // si ya existe un Producto con el mismo nombre en la tabla
                        let col_cantidad = columna.nextElementSibling; // el hermano de la columna del producto (o sea la columna cantidad)
                        cantidad = col_cantidad.firstChild; // le asigno su hijo (el párrafo dentro de la celda de cantidad)
                        cantidad_num = parseInt(cantidad.innerText) + 1; // innerText accede al numero dentro del <p>, y le sumo 1
                        // console.log(cantidad_num);

                        cantidad.innerHTML = cantidad_num; // actualizo cantidad

                        let col_importe = col_cantidad.nextElementSibling; // el hermano de la columna de la cantidad (o sea la columna importe)
                        let valor_numerico = col_importe.lastChild; // accedo únicamente al span del Importe (y no al $)
                        // console.log(valor_numerico)
                        valor_numerico_num =
                        parseInt(valor_numerico.innerText) +
                        parseInt(precio.substring(1)); // accedo solo al numero del DIV donde esta el precio original
                        
                        valor_numerico.innerHTML = valor_numerico_num; // actualizo importe
                        
                        // localStorage.setItem("total_carrito", valor_numerico.innerText);
                        precio_viejo = parseInt(localStorage.getItem("total_carrito_"+getCookie("usuario_actual")));
                        precio_viejo = isNaN(precio_viejo) ? 0 : precio_viejo; // Si precio_viejo es NAN le asigna 0, sino el numero del precio total del carrito guardado
                        precio_viejo += parseInt(precio.substring(1));
                        localStorage.setItem("total_carrito_"+getCookie("usuario_actual"), precio_viejo);
                        total_carrito.innerHTML = precio_viejo;
                    }
                });
            });
        }
        // guarda la tabla_cuerpo actualizada en LocalStorage
        localStorage.setItem("carrito_"+getCookie("usuario_actual"), tabla_cuerpo.outerHTML); // traigo el carrito del usuario actual
    }
    
    btn_limpiar.addEventListener("click", () => {
        tabla_cuerpo.innerHTML = "";
        // actualizo el LocaStorage con la tabla limpia
        localStorage.setItem("carrito_"+getCookie("usuario_actual"), tabla_cuerpo.outerHTML);
        localStorage.setItem("total_carrito_"+getCookie("usuario_actual"), "0");
        total_carrito.innerHTML = "0";
    });

    btn_volver.addEventListener("click", () => {
        window.location.href = "./index.html" // Vuelve al login
    })
});
