<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>EJERCICIO 1</title>
    <link rel="stylesheet" href="style.css">
</head>

<body>
    <section>
        <article>
            <h1>EJERCICIO 1</h1>
            <?php
            $conexion = new mysqli("localhost", "root", "", "inmobiliaria") or die("Error de conexión");
            $query = "SELECT * FROM inmueble ORDER BY idInmueble DESC LIMIT 30";
            // $query = "SELECT * FROM inmueble LIMIT 0, 30 "; Query sugerida por el profesor
            $conexion->query($query) or die("Error en la consulta");
            $resultado = $conexion->query($query);
            ?>
            <div id="botones">
                <button id="irEjercicio2"><a href="../2/index.php">Ir a Ejercicio 2</a></button>
                <form action="../3y4/index.php" method="post">
                    <button id="seleccionarInmueble" type="submit" name="submit">Seleccionar Inmueble</button>
            </div>
            <table>
                <thead>
                    <tr>
                        <th></th>
                        <th>ID Inmueble</th>
                        <th>Tipo Inmueble</th>
                        <th>Domicilio</th>
                        <th>Cantidad Dormitorios</th>
                        <th>Mejoras</th>
                        <th>Cantidad Baños</th>
                        <th>Observacion</th>
                    </tr>
                </thead>
                <tbody>
                    <?php
                    foreach ($resultado as $fila) {
                        echo "<tr>
                    <td> <input type='radio' name='seleccion' value='" . $fila['idInmueble'] . "' required></td>
                    <td>" . $fila['idInmueble'] . "</td>
                            <td>" . $fila['tipoInmueble'] . "</td>
                            <td>" . $fila['domicilio'] . "</td>
                            <td>" . $fila['cantidadDormitorios'] . "</td>
                            <td>" . $fila['mejoras'] . "</td>
                            <td>" . $fila['cantidadBanios'] . "</td>
                            <td>" . $fila['observacion'] . "</td>
                            </tr>";
                    }
                    $conexion->close();
                    ?>
                </tbody>
            </table>
            </form>
        </article>
    </section>
</body>

</html>