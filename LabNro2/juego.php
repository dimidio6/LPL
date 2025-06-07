<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="style.css">
    <title>Encuentra el centro num&eacute;rico</title>
</head>
<body>
    <header><h1>Encuentra el centro num&eacute;rico</h1></header>

    <?php
    $nro_juego = $_COOKIE["nro_juego"]; // trae la cookie 'nro_juego'
    $puntos = $_COOKIE["puntos"]; // trae la cookie 'puntos'
    $centro_numerico = 6; // asigno un centro numérico para probar
    ?>

    <section>
        <article>
            <?php

                function centro_numerico($num) {
                    // calculo la suma de los números a su izquierda
                    $lista_izq = 0;
                    for ($i = $num-1; $i == 0; $i--) {
                        $lista_izq -= $i;
                    }
                    // compruebo si existe una lista de números a su derecha que de =
                    $lista_der = $num+1; // inicializo esta variable con el número+1
                    while ($lista_der < $lista_izq) { // sumo hasta superar la lista izq
                        $lista_der += ($lista_der+1);
                        if ($lista_der == $lista_izq) { // si llegan a dar iguales, ES UN CENTRO NUMÉRICO
                            return true;
                        }
                    }
                    return false; // NO es un CENTRO NUMÉRICO
                }

                if (isset($_POST['btnVerificar']) && $_POST['btnVerificar']=='verificar' && isset($_POST['nro_ingresado'])) {
                    if ($_POST['nro_ingresado'] == $centro_numerico) { // en caso de que acierte
                        header("Location: fin.php");                        
                    }
                    else { // en caso de no acertar 

                    // decrementa en 1 la cookie de puntos
                    $puntos -= 1;
                    setcookie("puntos", $puntos, time() + 3600);

                    if ($puntos < 1) { // cuando agota los puntos va a la pantalla de fin
                        header("Location: fin.php");
                    }

                    // calculo la distancia del nro_ingresado al centro numérico
                    $distancia = $_POST['nro_ingresado'] - $centro_numerico; 
                    if ($distancia < 0) { // si me da negativo es porque nro_ingresado es < al centro numérico
                        $distancia = $distancia*(-1); // asi que lo paso a positivo para calcular la distancia
                    } 
                    if ($distancia > 5) { 
                            echo "<h3>Lejos de un centro numérico</h3>";
                        }
                        else {
                            echo "<h3>Cerca de un centro numérico</h3>";
                        }
                    }
                }
            ?>
            <h3>Nro. de Juego: <?php echo $nro_juego ?></h3>
            <h3>Puntos: <?php echo $puntos ?></h3>
        </article>
        <article>
            <form action="<?php echo htmlspecialchars($_SERVER['PHP_SELF']); ?>" method="post">
                <div>
                    <label for="nro_ingresado">Ingrese un número</label>
                    <input type="number" name="nro_ingresado">
                </div>
                <div>
                    <button type="submit" name="btnVerificar" value="verificar">Verificar</button>
                </div>
            </form>
        </article>
    </section>
</body>
</html>