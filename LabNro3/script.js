document.addEventListener("DOMContentLoaded", function() {
    
    var input_busqueda = document.getElementById("input_busqueda");
    var select_ubicaciones = document.getElementById("ubicaciones");
    var tabla = document.getElementById("cuerpo_tabla");


    input_busqueda.addEventListener("keyup", function() {
        var peticion = new XMLHttpRequest();
        peticion.open("GET", "back.php?busquedaProdu="+input_busqueda.value, true);
        peticion.onreadystatechange = function() {
            if ((peticion.readyState == 4) && (peticion.status == 200)) {
                var obj = JSON.parse(peticion.responseText);
                tabla.innerHTML = ""; // Limpia la tabla cada vez que hace una nueva búsqueda
                if (obj.productos) {
                    obj.productos.forEach(unProdu => {
                        let fila = document.createElement("tr");
                        let col1 = document.createElement("td");
                        let col2 = document.createElement("td");
                        let col3 = document.createElement("td");
                        let col4 = document.createElement("td");

                        col1.textContent = unProdu.nombre; // Asigna el nombre del producto
                        col2.textContent = unProdu.precio; // Asigna el valor del precio
                        col3.textContent = unProdu.supermercado; // Asigna el supermercado
                        col4.textContent = unProdu.ubicacion; // Asigna la ubicación
                        fila.appendChild(col1);
                        fila.appendChild(col2);
                        fila.appendChild(col3);
                        fila.appendChild(col4);
                        tabla.appendChild(fila);
                    })
                }
            }
            }
        peticion.send(null);
    })

    select_ubicaciones.addEventListener("change", function() {
        // console.log(select_ubicaciones.value);
        var peticion = new XMLHttpRequest();
        peticion.open("GET", "back.php?busquedaUbi="+select_ubicaciones.value, true);
        peticion.onreadystatechange = function() {
            if ((peticion.readyState == 4) && (peticion.status == 200)) {
                var obj = JSON.parse(peticion.responseText);
                tabla.innerHTML = ""; // Limpia la tabla cada vez que hace una nueva búsqueda
                if (obj.productos) {
                    obj.productos.forEach(unProdu => {
                        let fila = document.createElement("tr");
                        let col1 = document.createElement("td");
                        let col2 = document.createElement("td");
                        let col3 = document.createElement("td");
                        let col4 = document.createElement("td");

                        col1.textContent = unProdu.nombre; // Asigna el nombre del producto
                        col2.textContent = unProdu.precio; // Asigna el valor del precio
                        col3.textContent = unProdu.supermercado; // Asigna el supermercado
                        col4.textContent = unProdu.ubicacion; // Asigna la ubicación
                        fila.appendChild(col1);
                        fila.appendChild(col2);
                        fila.appendChild(col3);
                        fila.appendChild(col4);
                        tabla.appendChild(fila);
                    })
                }
            }      
        }
        peticion.send(null);
    })

//     function buscarProducto(valor, funcion) {
//     const peticion = new XMLHttpRequest();
//     peticion.open('GET', 'buscarProducto.php?valor=' + encodeURIComponent(valor), true);
//     peticion.onreadystatechange = function () {
//         if (peticion.readyState === 4 && peticion.status === 200) {
//             try {
//                 const respuesta = JSON.parse(peticion.responseText);
//                 funcion(respuesta);
//             } catch (error) {
//                 console.error("Error al parsear la respuesta:", error);
//             }
//         }
//     };
//     peticion.send(null);
// }
})