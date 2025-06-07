<?php
include_once("Usuario.class.php");
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <header>
        <h1>MI APP</h1>
    </header>
    <section>
        <article>
            <?php
            if (isset($_COOKIE["usuario"])) {
                $usuario = unserialize($_COOKIE["usuario"]);
                echo "<p>".$usuario->getNombre()."</p>";
                echo "<p>".$usuario->getDni()."</p>";
                echo "<p>".$usuario->getEmail()."</p>";
            }
            if (isset($_POST["cerrar"])) {
                setcookie("usuario", "", time() - 3600);
                header("Location: index.php");
                exit();
            }
            ?>
            <button><a href="gestor_personas_cookies.php">Gestionar Personas</a></button>
            <form action="app.php" method="post">
                <button type="submit" name="cerrar">
                    Cerrar Sesion
                </button>
            </form>
        </article>
    </section>
</body>
</html>