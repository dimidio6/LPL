<?php
include_once("producto.class.php");

$lista_productos = producto::getProductosBD($_GET['busquedaProdu']);

if (is_null($lista_productos)) {
    $objTemp = new stdClass();
    $objTemp->id_producto = '---';
    $objTemp->nombre = '---';
    $objTemp->id_supermercado = '---';
    $objTemp->precio = '---';
    $myJSON = json_encode($objTemp);
}
else {
    $obj = new stdClass();
    $obj->productos = $lista_productos;
    $myJSON = json_encode($obj);
}
echo $myJSON;
?>