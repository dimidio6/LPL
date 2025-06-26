<?php
class producto() {

    private $id_producto;
    private $nombre;
    private $precio;
    private $supermercado;
    private $ubicacion;

    public function __construct() {}

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
        $consulta = "SELECT * FROM precios INNER JOIN producto ON id_producto INNER JOIN supermercado ON id_supermercado";
        $precios = $conexion->query($consulta) or die ("No se pudo realizar la consulta de precios");
        while ($registro = $precios->fetch_object()) {
            $unProducto = new producto();
            $unProducto->setId_producto($registro->id_producto);
            $unProducto->setNombre($registro->nombre);
            $unProducto->setPrecio($registro->precio);
            $unProducto->setSupermercado($registro->nombre);
            $unProducto->setUbicacion($registro->ubicacion);
            $lista_productos[] = $unProducto;
        }
        $precios->free();
        $conexion->close();
        return $lista_productos;
    }
}
?>