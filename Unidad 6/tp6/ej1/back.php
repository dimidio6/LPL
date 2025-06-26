<?php
include_once("pais.class.php");
// $lista_paises = pais::getPaisesBD();
$lista_ciudades = pais::getCiudadesBD($_GET['idPais']); // utilizo un método estático (sin instanciar clase)
if (is_null($lista_ciudades)) {
    $objTemp = new stdClass();
    $objTemp->idPais = 'Pais no encontrado';
    $objTemp->nombrePais = '---';
    $objTemp->ciudades = '---';
    $myJSON = json_encode($objTemp);
}
else {
    $objTemp = new stdClass(); // creo una clase temporal
    $objTemp->ciudades = $lista_ciudades; // en su atributo 'ciudades' traigo la lista de ciudades
    $myJSON = json_encode($objTemp); // lo transformo a JSON
}
echo $myJSON;
?>