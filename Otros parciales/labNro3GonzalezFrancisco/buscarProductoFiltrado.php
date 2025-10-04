<?php
include ("producto.class.php");
$listaProductos = ProductoInfo::obtenerProductosBDFiltrados($_GET['cade'], $_GET['ubi']);
if($listaProductos == []){
    $objetoTemporal = new stdClass();
    $objetoTemporal->existe = "no";
    $miJSON = json_encode($objetoTemporal);
}
else{
    $arregloTemp = [];
    $unProdu = [];
    foreach($listaProductos as $produ){
        $unProdu = [
            'idProducto'=>$produ->getIdProducto(),
            'nombreProducto'=>$produ->getNombreProducto(),
            'idSupermercado'=>$produ->getIdSupermercado(),
            'nombreSupermercado'=>$produ->getNombreSupermercado(),
            'precio'=>$produ->getPrecio(),
            'ubicacion'=>$produ->getUbicacion()
        ];
        $arregloTemp []=$unProdu;
        $unProdu = [];
    }
    $miJSON = json_encode($arregloTemp);
}
echo $miJSON;
?>