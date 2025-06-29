<?php
include_once("producto.class.php");

$respuesta = new stdClass();

if (isset($_GET['busquedaProdu'])) {
    $lista_productos = producto::getProductosBD($_GET['busquedaProdu']); // trae la lista de productos de la BDD según la búsqueda
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
} elseif (isset($_GET['busquedaUbi'])) {
    $lista_productosUbi = producto::getProductosUbicacionBD($_GET['busquedaUbi']);
    if (empty($lista_productosUbi)) {
        $respuesta->productos = []; // devuelve una lista vacía si no encuentra nada
    }
    else {
        foreach ($lista_productosUbi as $producto) {
            $unProdu = array(); // una lista por cada producto
            $unProdu['nombre'] = $producto->getNombre();
            $unProdu['precio'] = $producto->getPrecio();
            $unProdu['supermercado'] = $producto->getSupermercado();
            $unProdu['ubicacion'] = $producto->getUbicacion();
            $respuesta->productos[] = $unProdu;
        }
    }
}
echo json_encode($respuesta);
?>