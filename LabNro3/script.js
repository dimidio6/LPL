document.addEventListener("DOMContentLoaded", function() {
    
    var input_busqueda = document.getElementById("input_busqueda");

    input_busqueda.addEventListener("keyup", function() {
        const peticion = new XMLHttpRequest();
        peticion.open("GET", "back.php?busquedaProdu="+input_busqueda.value, true);
        peticion.onreadystatechange = function() {
            if ((peticion.readyState == 4) && (peticion.status == 200)) {
                var obj = JSON.parse(peticion.responseText);
                var tabla = document.getElementById("cuerpo_tabla");
                if (obj.productos) {
                    obj.productos.foreach(producto => {
                        const fila = document.createElement("tr");
                        const col1 = document.createElement("td");
                        const col2 = document.createElement("td");
                        const col3 = document.createElement("td");
                        const col4 = document.createElement("td");
                        col1.appendChild(producto.nombre);
                        col2.appendChild(producto.precio);
                        col3.appendChild(producto.supermercado);
                        col4.appendChild(producto.ubicacion);
                        fila.appendChild(col1);
                        fila.appendChild(col2);
                        fila.appendChild(col3);
                        fila.appendChild(col4);
                        tabla.appendChild(fila);
                    }
                    )
                }
            }
        }
        peticion.send(null);
    })
})