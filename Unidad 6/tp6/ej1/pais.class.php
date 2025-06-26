<?php
class pais {

    private $idPais;
    private $nombrePais;

    public function __construct()
    {}

    public function getIdPais() {
        return $this->idPais;
    }

    public function getNombrePais() {
        return $this->nombrePais;
    }

    public function setIdPais($newId) {
        $this->idPais = $newId;
    }

    public function setNombrePais($newNombre) {
        $this->nombrePais = $newNombre;
    }

    // traigo todos los países de la BDD
    public static function getPaisesBD() {
        $lista_paises = array();
        $conexion = new mysqli("localhost","root","","paises") or die ("No se pudo establecer la conexión al motor de BD");
        $consulta = "SELECT * FROM pais ORDER BY idPais"; // trae todos los paises
        $listado = $conexion->query($consulta) or die ("No se pudo realizar la consulta");
        while ($registro = $listado->fetch_object()) {
            $unPais = new pais();
            $unPais->setIdPais($registro->idPais);
            $unPais->setNombrePais($registro->nombrePais);
            $lista_paises[] = $unPais;
        }
        $listado->free();
        $conexion->close();
        return $lista_paises;
    }

    // traigo todas las ciudades de la BDD asociadas a un país por su ID
    public static function getCiudadesBD($idPais) {
        $lista_ciudades = array();
        $conexion = new mysqli("localhost","root","","paises") or die ("No se pudo establecer la conexión al motor de BD");
        $consulta = "SELECT * FROM ciudad WHERE idPais = $idPais"; // trae todas las ciudades correspondientes al país
        $listado = $conexion->query($consulta) or die ("No se pudo realizar la consulta");
        while ($registro = $listado->fetch_object()) {
            $lista_ciudades[] = $registro->nombreCiudad;
        }
        $listado->free();
        $conexion->close();
        return $lista_ciudades;
    }
}
?>