<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Numeros</title>
</head>
<body>
    <header>Numeros del 1 al 1000</header>
    <?php
    function esPrimo($numero) { // devuelve booleano
        if ($numero < 2) return false; // ningún menor que 2 es primo
        for ($i = 2; $i <= sqrt($numero); $i++) { // evalúa hasta la raíz cuadrada del número
            if ($numero % $i == 0) return false; // si encuentra un divisor en el camino retorna falso
        }
        return true;
    }
    // creación de arreglos
    $pares = array();
    $impares = array();
    $primos = array(2); // lo inicializo con 2 porque es el único primo par
    for ($i = 1; $i <= 1000; $i++) {
        if ($i % 2 == 0) {
            array_push($pares,$i);
        }
        else {
            array_push($impares,$i);
            if (esPrimo($i)) { // considero la función solo en los impares porque ya añadí el 2
                array_push($primos,$i);
            }
        }
    }
    // impresión de arreglos
    echo "<h3>Números pares:<h3><br>"
    foreach($pares as $numero) {
        echo $numero.' ';
    }
    foreach($impares as $numero) {
        echo $numero.' ';
    }
    foreach($primos as $numero) {
        echo $numero.' ';
    }
    ?>
</body>
</html>