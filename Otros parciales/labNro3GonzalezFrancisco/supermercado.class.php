<?php
class Supermercado{
    private $id;
    private $nombre;
    private $ubicacion;

    public function __construct() {
    }

    public function getId() {
        return $this->id;
    }
    public function setId($id) {
        $this->id = $id;
    }
    public function getNombre() {
        return $this->nombre;
    }
    public function setNombre($nombre) {
        $this->nombre = $nombre;
    }
    public function getUbicacion() {
        return $this->ubicacion;
    }
    public function setUbicacion($ubicacion) {
        $this->ubicacion = $ubicacion;
    }

    public static function obtenerUbicacionesBD(){
        $listaUbicaciones = [];
        $conexion = new mysqli("localhost", "root", "", "comparador") or die ("NO se pudo conectar a la base de datos");
        //$idIN = $conexion->real_escape_string($id);
        $consulta = "SELECT DISTINCT ubicacion FROM supermercado";
        $resultado = $conexion->query($consulta) or die ("No se pudo hacer consulta de stockproducto");
        if($resultado->num_rows>0){
            while($supermercado = $resultado->fetch_object()){
                $UnSupermercado = new Supermercado();
                //$UnSupermercado->setId($supermercado->id_supermercado);
                //$UnSupermercado->setNombre($supermercado->nombre);
                $UnSupermercado->setUbicacion($supermercado->ubicacion);
                $listaUbicaciones[] = $UnSupermercado;
            }
        }
        $resultado->free();
        $conexion->close();
        return $listaUbicaciones;
    }

    public static function obtenerPrecioProducto($id){

    }

    public static function obtenerInfoSuper ($conexion, $producto){
        $idSupermercado = $conexion->real_escape_string($producto->getIdSupermercado());
        $consulta = "SELECT nombre, ubicacion FROM supermercado WHERE id_supermercado = '{$idSupermercado}'";
        $resultado = $conexion->query($consulta) or die ("NO SE PUDO CONSULTAR EL INFO DEL SUPER DESDE LA CLASE SUPER");
        $resuPosta = $resultado->fetch_object();
        $producto->setNombreSupermercado($resuPosta->nombre);
        $producto->setUbicacion($resuPosta->ubicacion);
    }
}
?>