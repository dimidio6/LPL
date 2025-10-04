<?php
class ProductoInfo{
    private $idProducto;
    private $nombreProducto;
    private $idSupermercado;
    private $nombreSupermercado;
    private $precio;
    private $ubicacion;

    public function getIdProducto() {
        return $this->idProducto;
    }
    public function setIdProducto($idProducto) {
        $this->idProducto = $idProducto;
    }
    public function getNombreProducto() {
        return $this->nombreProducto;
    }
    public function setNombreProducto($nombreProducto) {
        $this->nombreProducto = $nombreProducto;
    }
    public function getIdSupermercado() {
        return $this->idSupermercado;
    }
    public function setIdSupermercado($idSupermercado) {
        $this->idSupermercado = $idSupermercado;
    }
    public function getNombreSupermercado() {
        return $this->nombreSupermercado;
    }
    public function setNombreSupermercado($nombreSupermercado) {
        $this->nombreSupermercado = $nombreSupermercado;
    }
    public function getPrecio() {
        return $this->precio;
    }
    public function setPrecio($precio) {
        $this->precio = $precio;
    }
    public function getUbicacion() {
        return $this->ubicacion;
    }
    public function setUbicacion($Ubicacion) {
        $this->ubicacion = $Ubicacion;
    }

    public static function obtenerProductosBDSolos($cade){
        include("precio.class.php");
        include("supermercado.class.php");
        $listaProductos = [];
        $conexion = new mysqli("localhost", "root", "", "comparador") or die ("no se pudo conectar a la base de datos");
        $cadena = $conexion-> real_escape_string($cade);
        $consulta = "SELECT p.id_producto, p.id_supermercado, p.precio, pro.nombre
            FROM precios as p JOIN producto as pro
            ON  pro.id_producto = p.id_producto
            WHERE pro.nombre LIKE '%{$cadena}%'";
        $resu = $conexion->query($consulta) or die ("no se pudo ejecutar la consulta");
        while ($produ = $resu->fetch_object()){
            $UnProducto = new ProductoInfo();
            $UnProducto->setIdProducto($produ->id_producto);
            $UnProducto->setNombreProducto($produ->nombre);
            $UnProducto->setIdSupermercado($produ->id_supermercado);
            Precio::ObtenerPrecioProduSuper($conexion, $UnProducto);
            Supermercado::obtenerInfoSuper($conexion,$UnProducto);
            $listaProductos[]= $UnProducto;
        }
        $resu->free();
        $conexion->close();
        return $listaProductos;
    }

    public static function obtenerProductosBDFiltrados($cade, $ubicacion){
        include("precio.class.php");
        include("supermercado.class.php");
        $listaProductos = [];
        $conexion = new mysqli("localhost", "root", "", "comparador") or die ("no se pudo conectar a la base de datos");
        $cadena = $conexion-> real_escape_string($cade);
        $ubicacionIN = $conexion->real_escape_string($ubicacion);
        $consulta = "SELECT p.id_producto, p.id_supermercado, p.precio, pro.nombre, s.ubicacion
            FROM precios AS p
            JOIN producto AS pro ON pro.id_producto = p.id_producto
            JOIN supermercado AS s ON s.id_supermercado = p.id_supermercado
            WHERE pro.nombre LIKE '%{$cadena}%' AND s.ubicacion = '{$ubicacionIN}'";
        
        $resu = $conexion->query($consulta) or die ("no se pudo ejecutar la consulta");
        while ($produ = $resu->fetch_object()){
            $UnProducto = new ProductoInfo();
            $UnProducto->setIdProducto($produ->id_producto);
            $UnProducto->setNombreProducto($produ->nombre);
            $UnProducto->setIdSupermercado($produ->id_supermercado);
            Precio::ObtenerPrecioProduSuper($conexion, $UnProducto);
            Supermercado::obtenerInfoSuper($conexion,$UnProducto);
            $listaProductos[]= $UnProducto;
        }
        $resu->free();
        $conexion->close();
        return $listaProductos;
    }

    public static function obtenerProductosBDFiltro($ubicacion){
        include("precio.class.php");
        include("supermercado.class.php");
        $listaProductos = [];
        $conexion = new mysqli("localhost", "root", "", "comparador") or die ("no se pudo conectar a la base de datos");
        $ubicacion = $conexion-> real_escape_string($ubicacion);
        $consulta = "SELECT p.id_producto, p.id_supermercado, p.precio, pro.nombre, s.ubicacion
            FROM precios AS p
            JOIN producto AS pro ON pro.id_producto = p.id_producto
            JOIN supermercado AS s ON s.id_supermercado = p.id_supermercado
            WHERE s.ubicacion = '{$ubicacion}'";
        
        $resu = $conexion->query($consulta) or die ("no se pudo ejecutar la consulta");
        while ($produ = $resu->fetch_object()){
            $UnProducto = new ProductoInfo();
            $UnProducto->setIdProducto($produ->id_producto);
            $UnProducto->setNombreProducto($produ->nombre);
            $UnProducto->setIdSupermercado($produ->id_supermercado);
            Precio::ObtenerPrecioProduSuper($conexion, $UnProducto);
            Supermercado::obtenerInfoSuper($conexion,$UnProducto);
            $listaProductos[]= $UnProducto;
        }
        $resu->free();
        $conexion->close();
        return $listaProductos;
    }
}


?>