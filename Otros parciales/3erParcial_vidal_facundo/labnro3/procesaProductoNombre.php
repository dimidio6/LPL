<?php
require_once("Producto.class.php");
if(isset($_GET['nombre']) && isset($_GET['ubicacion'])){
    
    $datos =  Producto::getProductosPorNombreYUicacion($_GET['nombre'],$_GET['ubicacion']);

}
else if (isset($_GET['ubicacion'])){
    $datos =  Producto::getProductosPorUbicacion($_GET['ubicacion']);

}
else if(isset($_GET['nombre'])){
    $datos =  Producto::getProductosPorNombre($_GET['nombre']);

}

$tempArray = [];
if($datos !=  null){
    foreach($datos as $dato){
        $tempObj = new stdClass();
        $tempObj->idProducto = $dato->getIdProducto();
        $tempObj->nombreProducto = $dato->getNombreProducto();
        $tempObj->precio = $dato->getPrecio();
        $tempObj->supermercado = $dato->getSupermercado();
        $tempObj->ubicacion= $dato->getUbicacion();
        array_push($tempArray,$tempObj);

    }
    $tempJSON = json_encode($tempArray);
    echo $tempJSON;
}
else{
    $tempJSON = json_encode(null);
    echo $tempJSON;
}
?>