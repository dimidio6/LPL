document.addEventListener("DOMContentLoaded", function () {

    var input_busqueda = document.getElementById("input_busqueda");
    var select_ubicaciones = document.getElementById("ubicaciones");

    var tabla = document.getElementById("cuerpo_tabla");

    function realizar_peticion(producto, ubicacion) {
        var peticion = new XMLHttpRequest();
        // Manda por GET input + option
        peticion.open("GET", "back.php?busquedaProdu=" + producto + "&busquedaUbi=" + ubicacion, true);
        peticion.onreadystatechange = function () {
            if ((peticion.readyState == 4) && (peticion.status == 200)) {
                imprimir_productos(peticion);
            }
        }
        peticion.send(null);
    }


    function imprimir_productos(peticion) {
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
                col2.textContent = "$"+unProdu.precio; // Asigna el valor del precio
                col3.textContent = unProdu.supermercado; // Asigna el supermercado
                col4.textContent = unProdu.ubicacion; // Asigna la ubicación

                col1.setAttribute("class", "producto_detalles"); // me permite tratar todos los nombres_producto desde el CSS
                col1.addEventListener("click", function () { // a cada columna del nombre_producto le permite clickearla para mostrar el modal
                    mostrar_detalles(col1);
                })
                fila.appendChild(col1);
                fila.appendChild(col2);
                fila.appendChild(col3);
                fila.appendChild(col4);
                tabla.appendChild(fila);
            })
        }
    }

    function mostrar_detalles(columna) {
        const modal = document.getElementById("modal");

        var peticion_detalles = new XMLHttpRequest();
        peticion_detalles.open("GET", "back.php?detalles=" + columna.textContent, true);
        peticion_detalles.onreadystatechange = function () {
            if ((peticion_detalles.readyState == 4) && (peticion_detalles.status == 200)) {

                let nombre = document.getElementById("nombre_productoDetalles");
                let tabla_modal = document.getElementById("cuerpo_tablaDetalles");
                let menor_precio = document.getElementById("menor_precio");
                let diferencia_precio = document.getElementById("diferencia_precio");
                let obj_detalles = JSON.parse(peticion_detalles.responseText);

                nombre.innerText = columna.textContent; // Imprimo el nombre del producto
                tabla_modal.innerHTML = ""; // Limpio la tabla antes de cargar información

                let precio_may = 0; // Inicializo la variable
                let precio_men = 0;
                let primer_produ = true; // Me sirve para asignar el menor precio al 1er producto
                let super_barato = "";
                let ubi_barato = "";

                if (obj_detalles.detalles) {
                    obj_detalles.detalles.forEach(produ => {
                        let precio = parseFloat(produ.precio); // mucho muy importante
                        // CÁLCULOS //
                        // Asigno como menor precio de base el primer producto que itere, para luego comparar con este
                        if (primer_produ) {
                            precio_men = precio;
                            primer_produ = false; // No vuelve a entrar con el resto de productos
                        }
                        // Defino el menor y mayor precio
                        if (precio <= precio_men) {
                            precio_men = precio;
                            super_barato = produ.supermercado;
                            ubi_barato = produ.ubicacion;
                        }
                        if (precio > precio_may) {
                            precio_may = precio;
                        }

                        // ARMADO DE TABLA //
                        // Agrego filas a la estructura de la tabla con los valores obtenidos del JSON
                        let det_fila = document.createElement("tr");
                        let det_col1 = document.createElement("td");
                        let det_col2 = document.createElement("td");
                        let det_col3 = document.createElement("td");

                        det_col1.textContent = produ.supermercado; // Asigna el supermercado
                        det_col2.textContent = "$"+produ.precio; // Asigna el valor del precio
                        det_col3.textContent = produ.ubicacion; // Asigna la ubicación
                        det_fila.appendChild(det_col1);
                        det_fila.appendChild(det_col2);
                        det_fila.appendChild(det_col3);
                        tabla_modal.appendChild(det_fila);
                    })
                }
                menor_precio.innerText = "Menor precio: "+super_barato+" - "+ubi_barato;
                diferencia_precio.innerText = "Diferencia entre el menor y mayor precio: $"+precio_may+" - $"+precio_men+" = $"+
                (precio_may-precio_men);
            }
            modal.showModal();
        }
        peticion_detalles.send(null);
    }

    input_busqueda.addEventListener("keyup", function () {
        // Cuando ingreso texto en el input trae la ubicación selected
        let ubicacion = document.getElementById("ubicaciones").value;
        realizar_peticion(input_busqueda.value, ubicacion);
    })

    select_ubicaciones.addEventListener("change", function () {
        // Cuando cambio la ubicación trae lo que hay en el input
        let producto = document.getElementById("input_busqueda").value;
        realizar_peticion(producto, select_ubicaciones.value);
    })
})