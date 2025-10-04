function buscarProducto(){
    var cade = document.getElementById("inputProductos").value;
    var peticion = new XMLHttpRequest();

    const filtroUbicacion = document.getElementById("selectUbicacion").value;
    console.log(filtroUbicacion)
    if ((filtroUbicacion == 0) && (cade !== "")){
        peticion.open("GET", "buscarProducto.php?cade="+cade, true);
    }
    if ((filtroUbicacion != 0) && (cade!== "")){
        peticion.open("GET", "buscarProductoFiltrado.php?cade=" + cade + "&ubi=" + filtroUbicacion, true);
    }
    if ((filtroUbicacion !=0) &&(cade == "")){
        peticion.open("GET", "buscarProductoFiltro.php?ubi="+filtroUbicacion, true);
    }
    peticion.onreadystatechange = validarInput;
    peticion.send(null);

    function validarInput() {
        limpiarElementoPorId("tablaProducto");
        console.log(peticion.responseText);
        if ((peticion.readyState == 4) && (peticion.status == 200)){
            var objeto = JSON.parse(peticion.responseText);
            if (objeto.existe == "no"){
                document.getElementById("mensajeInput").textContent = "Producto No Valido";
                limpiarElementoPorId("tabla");
                limpiarElementoPorId("infoAvion");
            }
            else{
                crearTabla();
                completarTablaProductos(objeto);
            }
        }
    }
}

function limpiarElementoPorId(id) {
    var elemento = document.getElementById(id);
    while (elemento.firstChild) {
        elemento.removeChild(elemento.firstChild);
    }
}
function crearTabla(){
    const tabla = document.getElementById("tablaProducto");
    const fila = document.createElement("tr");
    const producto = document.createElement("th");
    producto.textContent= "Producto";
    const precio = document.createElement("th");
    precio.textContent= "Precio";
    const supermercado = document.createElement("th");
    supermercado.textContent= "Supermercado";
    const ubicacion = document.createElement("th");
    ubicacion.textContent= "Ubicación";
    const boton = document.createElement("th");
    boton.textContent="Detalle";
    fila.appendChild(producto);
    fila.appendChild(precio);
    fila.appendChild(supermercado);
    fila.appendChild(ubicacion);
    fila.appendChild(boton);
    tabla.appendChild(fila)
}

function completarTablaProductos(objeto){
    const tabla = document.getElementById("tablaProducto");
    for (let i of objeto){
        const fila = document.createElement("tr");
        const productoEL = document.createElement("td");
        productoEL.textContent = i.nombreProducto;
        const precioEL = document.createElement("td");
        precioEL.textContent = i.precio;
        const supermercadoEL = document.createElement("td");
        supermercadoEL.textContent=i.nombreSupermercado;
        const ubicacionEL = document.createElement("td");
        ubicacionEL.textContent = i.ubicacion;

        const boton = document.createElement("button");
        boton.setAttribute("onclick", "verDetalle("+i.idProducto+")");
        boton.textContent="Ver Detalle"

        fila.appendChild(productoEL);
        fila.appendChild(precioEL);
        fila.appendChild(supermercadoEL);
        fila.appendChild(ubicacionEL);
        fila.appendChild(boton);
        tabla.appendChild(fila);
    }
}
function verDetalle($idProducto){
    
}
