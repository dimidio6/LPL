<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="style.css">
    <title>Juego</title>
</head>
<body>
    <header>
        <h1>Encuentra el centro num&eacute;rico</h1>
    </header>
    <section>
        <article>
            <form action="index.php" method="post">
                <button type="submit" name="btnIniciar" id="idBtnIniciar">INICIAR JUEGO</button>
            </form>
            <?php
                if ($_SERVER["REQUEST_METHOD"] == "POST" && isset($_POST["btnIniciar"])) {
                    if (!isset($_COOKIE["nro_juego"])) { // si la cookie 'nro_juego' no existe la crea
                        setcookie("nro_juego", 1, time() + 3600);
                    }
                    else { // si ya existía aumenta +1 su valor
                        $cantidad_juegos = $_COOKIE["nro_juego"];
                        $cantidad_juegos += 1;
                        setcookie("nro_juego", $cantidad_juegos, time() + 3600);

                    }
                    setcookie("puntos", 10, time() + 3600); // empiezo el juego con una cookie de 10 puntos
                    header("Location: juego.php"); // dirige a juego.php
                    exit();
                }
            ?>
        </article>
    </section>
</body>
</html>