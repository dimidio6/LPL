<?php
class producto {

    private $id_producto;
    private $nombre;
    private $precio;
    private $supermercado;
    private $ubicacion;

    public function __construct() {}

    public function getId_producto() {
        return $this->id_producto;
    }

    public function getNombre() {
        return $this->nombre;
    }

    public function getPrecio() {
        return $this->precio;
    }

    public function getSupermercado() {
        return $this->supermercado;
    }

    public function getUbicacion() {
        return $this->ubicacion;
    }

    public function setId_producto($newId) {
        $this->id_producto = $newId;
    }

    public function setNombre($newNombre) {
        $this->nombre = $newNombre;
    }
    
    public function setPrecio($newPrecio) {
        $this->precio = $newPrecio;
    }

    public function setSupermercado($newSuper) {
        $this->supermercado = $newSuper;
    }

    public function setUbicacion($newUbicacion) {
        $this->ubicacion = $newUbicacion;
    }

    public static function getProductosBD($nombreProducto) {
        $lista_productos = array();
        $conexion = new mysqli("localhost","root","","comparador") or die ("No se pudo establecer la conexión al motor de BD");
        // Consulta a la BDD
        // utilizo AS para poder asignar esos índices al $registro (de lo contrario genera ambiguedad entre las tablas)
        $consulta = "SELECT pre.id_producto, pro.nombre AS nombreProdu, precio, sup.nombre AS nombreSuper, ubicacion 
        FROM precios pre JOIN producto pro  ON pre.id_producto = pro.id_producto JOIN supermercado sup 
        ON sup.id_supermercado = pre.id_supermercado WHERE pro.nombre LIKE '$nombreProducto%'"; // % = coincida el principio, según donde se ponga cambia

        $productos = $conexion->query($consulta) or die ("No se pudo realizar la consulta de productos");
        while ($registro = $productos->fetch_array()) {
            $unProducto = new producto();
            $unProducto->setId_producto($registro['id_producto']);
            $unProducto->setNombre($registro['nombreProdu']);
            $unProducto->setPrecio($registro['precio']);
            $unProducto->setSupermercado($registro['nombreSuper']);
            $unProducto->setUbicacion($registro['ubicacion']);
            $lista_productos[] = $unProducto;
        }
        $productos->free();
        $conexion->close();
        return $lista_productos;
    }

    public static function getUbicacionesBD() {
        $lista_ubicaciones = array();
        $conexion = new mysqli("localhost","root","","comparador") or die ("No se pudo establecer la conexión al motor de BD");
        // Consulta a la BDD
        $consulta = "SELECT DISTINCT ubicacion FROM supermercado";
        $ubicaciones = $conexion->query($consulta) or die ("No se pudo realizar la consulta para obtener las ubicaciones");
        while ($registro = $ubicaciones->fetch_object()) {
            $lista_ubicaciones[] = $registro->ubicacion;
        }
        $ubicaciones->free();
        $conexion->close();
        return $lista_ubicaciones;
    }

    public static function getProductosUbicacionBD($ubicacion) {
        $lista_productosUbi = array();
        $conexion = new mysqli("localhost","root","","comparador") or die ("No se pudo establecer la conexión al motor de BD");
        // Consulta a la BDD
        $consulta = "SELECT pre.id_producto, pro.nombre AS nombreProdu, precio, sup.nombre AS nombreSuper, ubicacion FROM precios pre 
        JOIN producto pro  ON pre.id_producto = pro.id_producto JOIN supermercado sup ON sup.id_supermercado = pre.id_supermercado
        WHERE sup.ubicacion LIKE '$ubicacion%'"; // LIKE para que cuando se quite el filtro vuelva a mostrar todas las ubicaciones

        $productosUbi = $conexion->query($consulta) or die ("No se pudo realizar la consulta de productos por Ubicación");
        while ($registro = $productosUbi->fetch_array()) {
            $unProducto = new producto();
            $unProducto->setId_producto($registro['id_producto']);
            $unProducto->setNombre($registro['nombreProdu']);
            $unProducto->setPrecio($registro['precio']);
            $unProducto->setSupermercado($registro['nombreSuper']);
            $unProducto->setUbicacion($registro['ubicacion']);
            $lista_productosUbi[] = $unProducto;
        }
        $productosUbi->free();
        $conexion->close();
        return $lista_productosUbi;
    }
}
?>