<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>EJERCICIO 5</title>
    <link rel="stylesheet" href="style.css">
</head>

<body>
    <section>
        <article>
            <h1>EJERCICIO 5</h1>
            <table>
                <thead>
                    <tr>
                        <th>Tipo de Inmueble</th>
                        <th>Domicilio</th>
                        <th>Fecha de Inicio del Alquiler</th>
                        <th>Importe del Alquiler</th>
                    </tr>
                </thead>
                <tbody>
                    <?php
                    $conexion = new mysqli("localhost", "root", "", "inmobiliaria") or die("Error de conexión");
                    $query = "SELECT i.tipoInmueble, i.domicilio, o.FechaInicio , o.importe FROM inmueble i INNER JOIN operacion o ON i.idInmueble = o.idInmueble WHERE o.tipoOperacion like 'Alquiler' LIMIT 0, 30";
                    $resultado = $conexion->query($query) or die("Error en la consulta");
                    foreach ($resultado as $fila) {
                        echo "<tr>";
                        echo "<td>" . $fila['tipoInmueble'] . "</td>";
                        echo "<td>" . $fila['domicilio'] . "</td>";
                        echo "<td>" . $fila['FechaInicio'] . "</td>";
                        echo "<td>" . $fila['importe'] . "</td>";
                        echo "</tr>";
                    }
                    $conexion->close();
                    ?>
                </tbody>
            </table>
        </article>
    </section>
</body>

</html>