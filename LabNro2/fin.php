<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="style.css">
    <title>Fin de la partida</title>
</head>
<body>
    <header>
        <h1>Encuentra el centro num&eacute;rico</h1>
    </header>
    <h2>Fin del juego</h2>
    <section>
        <article>
            <?php
            if ($_COOKIE["puntos"] > 0) {
                echo "<h2>Ganaste!!</h2>";
            }
            else {
                echo "<h2>Perdiste :(</h2>";
            }
            ?>
            <h3>Puntos: <?php echo $_COOKIE["puntos"] ?> </h3>
            <form action="index.php" method="post">
                <button type="submit" name="btnVolver">Volver</button>
            </form>
            <?php
                if ($_SERVER["REQUEST_METHOD"] == "POST" && isset($_POST["btnVolver"])) {
                    header("Location: index.php"); // vuelve al inicio
                    exit();
                }
            ?>
        </article>
    </section>
</body>
</html>