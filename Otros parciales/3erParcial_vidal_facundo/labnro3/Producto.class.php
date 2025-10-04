<?php 
class Producto{
    private int $idProducto;
    private string $nombreProducto;
    private float $precio;
    private string $supermercado;
    private string $ubicacion;
    public function __construct (int $idProducto, string $nombreProducto, float $precio,string $supermercado, string $ubicacion){
        $this->idProducto = $idProducto;
        $this->nombreProducto = $nombreProducto;
        $this->precio = $precio;
        $this-> supermercado = $supermercado;
        $this->ubicacion = $ubicacion;
    }
    public function getIdProducto(){
       return $this->idProducto;
    }
    public function getNombreProducto(){
        return $this->nombreProducto;
    }
    public function getPrecio(){
        return $this->precio;
    }
    public function getUbicacion(){
        return $this->ubicacion;
    }
    public function getSupermercado(){
        return $this->supermercado;
    }
    public static function getProductosPorNombre($nombre){
        $con = new mysqli("localhost","root","","comparador") or die ("No se pudo establecer la conexion.");
        $query  = "SELECT pro.nombre AS nombreProducto,
        pro.id_producto,
        pre.precio,
        pre.id_supermercado,
        pre.id_producto,
        s.id_supermercado,
        s.ubicacion,
        s.nombre AS nombreSupermercado

         FROM producto AS pro INNER JOIN precios AS pre ON  pro.id_producto = pre.id_producto
        INNER JOIN supermercado AS s ON pre.id_supermercado = s.id_supermercado WHERE pro.nombre LIKE '%".$nombre."%'";
        $resu = $con->query($query);
        $productos = [];
        if($resu->num_rows > 0){
            while($register = $resu->fetch_object()){
                $producto = new Producto((int)$register->id_producto,$register->nombreProducto,(float)$register->precio,$register->nombreSupermercado,$register->ubicacion);
                array_push($productos,$producto);
            }
            $con->close();
            $resu->free();
            return $productos;
        }
        else{
            $con->close();
            $resu->free();
            return null;
        }
    }
    public static function getProductosPorUbicacion($nombre){
        $con = new mysqli("localhost","root","","comparador") or die ("No se pudo establecer la conexion.");
        $query  = "SELECT pro.nombre AS nombreProducto,
        pro.id_producto,
        pre.precio,
        pre.id_supermercado,
        pre.id_producto,
        s.id_supermercado,
        s.ubicacion,
        s.nombre AS nombreSupermercado

         FROM producto AS pro INNER JOIN precios AS pre ON  pro.id_producto = pre.id_producto
        INNER JOIN supermercado AS s ON pre.id_supermercado = s.id_supermercado WHERE s.ubicacion LIKE '%".$nombre."%'";
        $resu = $con->query($query);
        $productos = [];
        if($resu->num_rows > 0){
            while($register = $resu->fetch_object()){
                $producto = new Producto((int)$register->id_producto,$register->nombreProducto,(float)$register->precio,$register->nombreSupermercado,$register->ubicacion);
                array_push($productos,$producto);
            }
            $con->close();
            $resu->free();
            return $productos;
        }
        else{
            $con->close();
            $resu->free();
            return null;
        }
    }
    public static function getProductosPorNombreYUicacion($nombre,$ubicacion){
        $con = new mysqli("localhost","root","","comparador") or die ("No se pudo establecer la conexion.");
        $query  = "SELECT pro.nombre AS nombreProducto,
        pro.id_producto,
        pre.precio,
        pre.id_supermercado,
        pre.id_producto,
        s.id_supermercado,
        s.ubicacion,
        s.nombre AS nombreSupermercado

         FROM producto AS pro INNER JOIN precios AS pre ON  pro.id_producto = pre.id_producto
        INNER JOIN supermercado AS s ON pre.id_supermercado = s.id_supermercado WHERE (s.ubicacion LIKE '%".$ubicacion."%') AND (pro.nombre LIKE '%".$nombre."%')";
        $resu = $con->query($query);
        $productos = [];
        if($resu->num_rows > 0){
            while($register = $resu->fetch_object()){
                $producto = new Producto((int)$register->id_producto,$register->nombreProducto,(float)$register->precio,$register->nombreSupermercado,$register->ubicacion);
                array_push($productos,$producto);
            }
            $con->close();
            $resu->free();
            return $productos;
        }
        else{
            $con->close();
            $resu->free();
            return null;
        }
    }
    
}
?>