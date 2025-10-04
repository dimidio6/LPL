<?php
class Precio{

    public static function ObtenerPrecioProduSuper($conexion, $producto){
        $idProducto = $conexion->real_escape_string($producto->getIdProducto());
        $idSupermercado = $conexion->real_escape_string($producto->getIdSupermercado());
        $consulta = "SELECT precio FROM precios WHERE id_producto = '{$idProducto}' AND id_supermercado = '{$idSupermercado}'";
        $resultado = $conexion->query($consulta) or die ("NO SE PUDO CONSULTAR EL PRECIO DESDE LA CLASE PRECIO");
        $resuPosta = $resultado->fetch_object();
        $producto->setPrecio($resuPosta->precio); //teoricamente devuelve el producto con el precio
    }
}
?>