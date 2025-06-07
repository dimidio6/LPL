<?php
class Usuario {
    private $nombre;
    private $dni;
    private $email;
    private $rol;
    function __construct($nombre, $dni, $email)
    {
        $this->nombre = $nombre;
        $this->dni = $dni;
        $this->email = $email;
        $this->rol;
    }
    public function getNombre() {
        return $this->nombre;
    }
    public function getDni() {
        return $this->dni;
    }
    public function getEmail() {
        return $this->email;
    }
    public function getRol() {
        return $this->rol;
    }
    public function setRol($rol) {
        $this->rol = $rol;
    }
}
?>