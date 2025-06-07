<?php
include_once("Usuario.class.php");
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
        <h2>Usuario: <?php echo unserialize($_COOKIE["usuario"])->getNombre()?></h2>
    </header>
    <section>
        <article>
            <form action="gestor_personas_cookies.php" method="post">
                <input name="nombre" type="text" required placeholder="Nombre">
                <input name="dni" type="number" required placeholder="Dni">
                <input name="rol" type="text" required placeholder="Rol">
                <button name="ingresar">Ingresar</button>
            </form>
            <form action="gestor_personas_cookies.php" method="post">
                <button name="limpiar">Limpiar Personas</button>
            </form>
            <?php
            $lista_usuarios = array();
            if ($_SERVER["REQUEST_METHOD"] === "POST") {
                if (isset($_POST["ingresar"])) {
                    $usuario = new Usuario($_POST["nombre"], $_POST["dni"], "");
                    $usuario->setRol($_POST["rol"]);
                    if (isset($_COOKIE["lista-usuarios-".unserialize($_COOKIE["usuario"])->getNombre()])) {
                        $lista_usuarios = unserialize($_COOKIE["lista-usuarios-".unserialize($_COOKIE["usuario"])->getNombre()]);
                    }
                    array_push($lista_usuarios, $usuario);
                    setcookie("lista-usuarios-".unserialize($_COOKIE["usuario"])->getNombre(),serialize($lista_usuarios), time() + 36000);
                    header("Location: gestor_personas_cookies.php");
                    exit();
                } else if (isset($_POST["cerrar"])) {
                    setcookie("usuario", "", time() - 3600);
                    header("Location: index.php");
                    exit();
                } else if (isset($_POST["limpiar"])) {
                    setcookie("lista-usuarios-".unserialize($_COOKIE["usuario"])->getNombre(), "", time() - 3600);
                    header("Location: gestor_personas_cookies.php");
                    exit();
                }
            }
            ?>
            <table>
                <th>Nombre</th>
                <th>DNI</th>
                <th>Rol</th>
                <?php
                if (isset($_COOKIE["lista-usuarios-".unserialize($_COOKIE["usuario"])->getNombre()])) {
                    foreach (unserialize($_COOKIE["lista-usuarios-".unserialize($_COOKIE["usuario"])->getNombre()]) as $nuevo_usuario) {
                        echo "<tr>";
                        echo "<td>".$nuevo_usuario->getNombre()."</td>";
                        echo "<td>".$nuevo_usuario->getDni()."</td>";
                        echo "<td>".$nuevo_usuario->getRol()."</td>";
                        echo "</tr>";
                    }
                }
                ?>
            </table>
            <form action="" method="post">
                <button name="cerrar">Cerrar Sesion</button>
            </form>
        </article>
    </section>
    <footer>
        <p></p>
    </footer>
</body>
</html>