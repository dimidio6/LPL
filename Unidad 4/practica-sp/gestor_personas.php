<?php
include_once("Usuario.class.php");
session_start();
if (!isset($_SESSION["lista-usuarios"])) {
    $_SESSION["lista-usuarios"] = array();
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>GESTIONALA</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <header>
        <h1>Gestioanala bien
            Es tuya
            Sacale todas las cookies
        </h1>
    </header>
    <section>
        <article>
            <form action="gestor_personas.php" method="post">
                <input name="nombre" type="text" required placeholder="Nombre">
                <input name="dni" type="number" required placeholder="Dni">
                <input name="rol" type="text" required placeholder="Rol">
                <button name="ingresar">Ingresar</button>
            </form>
            <?php
            if ($_SERVER["REQUEST_METHOD"] === "POST") {
                if (isset($_POST["ingresar"])) {
                    $usuario = new Usuario($_POST["nombre"], $_POST["dni"], "");
                    $usuario->setRol($_POST["rol"]);
                    array_push($_SESSION["lista-usuarios"], $usuario);
                    setcookie("usuario-".$_POST["nombre"], serialize($usuario), time() + 36000);
                }
            }
            ?>
            <table>
                <th>Nombre</th>
                <th>DNI</th>
                <th>Rol</th>
                <?php
                if (isset($_SESSION["lista-usuarios"])) {
                    foreach ($_SESSION["lista-usuarios"] as $nuevo_usuario) {
                        echo "<tr>";
                        echo "<td>".$nuevo_usuario->getNombre()."</td>";
                        echo "<td>".$nuevo_usuario->getDni()."</td>";
                        echo "<td>".$nuevo_usuario->getRol()."</td>";
                        echo "</tr>";
                    }
                }
                ?>
            </table>
        </article>
    </section>
    <footer>
        <p></p>
    </footer>
</body>
</html>