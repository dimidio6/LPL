<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>EJERCICIO 3 y 4</title>
    <link rel="stylesheet" href="style.css">
</head>

<body>
    <section>
        <article>
            <h1>EJERCICIO 3 y 4</h1>
            <fieldset>
                <legend>Actualizar Inmuebles</legend>
                <?php
                if ($_SERVER["REQUEST_METHOD"] === "POST") {
                    if (isset($_POST["submit"])) {
                        $conexion = new mysqli("localhost", "root", "", "inmobiliaria") or die("Error de conexión");
                        $idSeleccionada = $_POST["seleccion"];
                        $obtenerSeleccion = "SELECT * FROM inmueble WHERE idInmueble = $idSeleccionada";
                        $seleccion = $conexion->query($obtenerSeleccion) or die("Error en la consulta");
                        foreach ($seleccion as $fila) {
                            echo "<form action='index.php' method='post'>";
                            echo "<select name='tipoInmueble' id=''>";
                            echo "<option value='" . $fila['tipoInmueble'] . "' selected>" . $fila['tipoInmueble'] . "</option>";
                            echo "<option value='Casa'>Casa</option>";
                            echo "<option value='Departamento'>Departamento</option>";
                            echo "<option value='Terreno'>Terreno</option>";
                            echo "<option value='Quinta'>Quinta</option>";
                            echo "</select>";
                            echo "<input type='text' placeholder='Domicilio' name='domicilio' value='" . $fila['domicilio'] . "' required>";
                            echo "<input type='number' placeholder='Cantidad de Dormitorios' name='cantidadDormitorios' value='" . $fila['cantidadDormitorios'] . "' required>";
                            echo "<select name='mejoras' id=''>";
                            echo "<option value='" . $fila['mejoras'] . "' selected>" . $fila['mejoras'] . "</option>";
                            echo "<option value='Garage'>Garage</option>";
                            echo "<option value='Jardín'>Jardín</option>";
                            echo "<option value='Cercado'>Cercado</option>";
                            echo "<option value='Piscina'>Piscina</option>";
                            echo "<option value='Sin cerco'>Sin cerco</option>";
                            echo "</select>";
                            echo "<input type='number' placeholder='Cantidad de Baños' name='cantidadBanios' value='" . $fila['cantidadBanios'] . "' required>";
                            echo "<textarea placeholder='Observaciónes' name='observacion' required>" . $fila['observacion'] . "</textarea>";
                            echo "<input type='hidden' name='idInmueble' value='" . $fila['idInmueble'] . "'>";
                            echo "<div id='botones'>";
                            echo "<button type='submit' name='actualizar'>Actualizar Inmueble</button>";
                            echo "<button type='submit' name='eliminar'>Eliminar Inmueble</button>";
                            echo "</div>";
                            echo "</form>";
                        }
                        $conexion->close();
                    }
                    if (isset($_POST["actualizar"])) {
                        $conexion = new mysqli("localhost", "root", "", "inmobiliaria") or die("Error de conexión");
                        $idInmueble = $_POST["idInmueble"];
                        $tipoInmueble = $_POST["tipoInmueble"];
                        $domicilio = $_POST["domicilio"];
                        $cantidadDormitorios = $_POST["cantidadDormitorios"];
                        $mejoras = $_POST["mejoras"];
                        $cantidadBanios = $_POST["cantidadBanios"];
                        $observacion = $_POST["observacion"];
                        $actualizarInmueble = "UPDATE inmueble SET tipoInmueble='$tipoInmueble', domicilio='$domicilio', cantidadDormitorios='$cantidadDormitorios', mejoras='$mejoras', cantidadBanios='$cantidadBanios', observacion='$observacion' WHERE idInmueble='$idInmueble'";
                        $conexion->query($actualizarInmueble) or die("Error en la actualización");
                        $conexion->close();
                        header("Location: ../1/index.php");
                        exit();
                    }
                    if (isset($_POST["eliminar"])) {
                        $conexion = new mysqli("localhost", "root", "", "inmobiliaria") or die("Error de conexión");
                        $idInmueble = $_POST["idInmueble"];
                        $eliminarInmueble = "DELETE FROM inmueble WHERE idInmueble='$idInmueble'";
                        $conexion->query($eliminarInmueble) or die("Error en la eliminación");
                        $conexion->close();
                        header("Location: ../1/index.php");
                        exit();
                    }
                }
                ?>
            </fieldset>
                    <button id="volver"><a href="../1/index.php">Volver al Ejercicio 1</a></button>
        </article>
    </section>
</body>

</html>