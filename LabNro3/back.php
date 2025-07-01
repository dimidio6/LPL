<?php
include_once("producto.class.php");

$respuesta = new stdClass();

if (isset($_GET['busquedaProdu']) && isset($_GET['busquedaUbi'])) {
    $lista_productos = producto::getProductosBD($_GET['busquedaProdu'], $_GET['busquedaUbi']);
    if (empty($lista_productos)) {
        $respuesta->productos = []; // devuelve una lista vacía si no encuentra nada
    }
    else {
        foreach ($lista_productos as $producto) {
            $unProdu = array(); // una lista por cada producto
            $unProdu['nombre'] = $producto->getNombre();
            $unProdu['precio'] = $producto->getPrecio();
            $unProdu['supermercado'] = $producto->getSupermercado();
            $unProdu['ubicacion'] = $producto->getUbicacion();
            $respuesta->productos[] = $unProdu; // mi objeto va a tener una lista con listas de productos para poder convertirlo a JSON
        }
    }
}

if (isset($_GET['detalles'])) {
    $lista_detalles = producto::getDetallesProducto($_GET['detalles']);
    if (empty($lista_detalles)) {
        $respuesta->detalles = [];
    }
    else {
        foreach ($lista_detalles as $producto) {
            $produ_detalles = array(); // una lista por cada producto
            $produ_detalles['supermercado'] = $producto->getSupermercado();
            $produ_detalles['precio'] = $producto->getPrecio();
            $produ_detalles['ubicacion'] = $producto->getUbicacion();
            $respuesta->detalles[] = $produ_detalles;
        }
    }
}
echo json_encode($respuesta);
?>