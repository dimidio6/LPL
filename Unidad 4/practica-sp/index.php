<?php
include_once("Usuario.class.php");
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Afganistan</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <header>
        <h1>Ingresa papito</h1>
    </header>
    <section>
        <article>
            <form action="index.php" method="post">
                <input name="nombre" type="text" required placeholder="Nombre">
                <input name="dni" type="number" required placeholder="Dni">
                <input name="email" type="email" required placeholder="Email">
                <button name="ingresar">Ingresar</button>
            </form>
            <?php
            if ($_SERVER["REQUEST_METHOD"] === "POST") {
                if (isset($_POST["ingresar"])) {
                    $usuario = new Usuario($_POST["nombre"], $_POST["dni"], $_POST["email"]);
                    setcookie("usuario", serialize($usuario), time() + 3600);
                    header("Location: app.php");
                }
            }
            ?>
        </article>
    </section>
    <footer>
        <p>&copy; 2025</p>
    </footer>
</body>
</html>