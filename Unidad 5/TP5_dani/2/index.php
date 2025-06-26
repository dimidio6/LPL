<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>EJERCICIO 2</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <section>
        <article>
            <h1>EJERCICIO 2</h1>
            <fieldset>
                <legend>Insertar Inmuebles</legend>
                <form action="index.php" method="post">
                    <!-- <input type="text" placeholder="Tipo de Inmueble" name="tipoInmueble" required> Es una lista -->
                    <select name="tipoInmueble" id="">
                        <option value="" disabled selected>Seleccione un tipo de inmueble</option>
                        <option value="Casa">Casa</option>
                        <option value="Departamento">Departamento</option>
                        <option value="Terreno">Terreno</option>
                        <option value="Quinta">Quinta</option>
                    </select>
                    <input type="text" placeholder="Domicilio" name="domicilio" required>
                    <input type="number" placeholder="Cantidad de Dormitorios" name="cantidadDormitorios" required>
                    <!-- <input type="text" placeholder="Mejoras" name="mejoras" required> Es una lista -->
                    <select name="mejoras" id="">
                        <option value="" disabled selected>Seleccione mejoras</option>
                        <option value="Garage">Garage</option>
                        <option value="Jardín">Jardín</option>
                        <option value="Cercado">Cercado</option>
                        <option value="Piscina">Piscina</option>
                        <option value="Sin cerco">Sin cerco</option>
                    </select>
                    <input type="number" placeholder="Cantidad de Baños" name="cantidadBanios" required>
                    <textarea placeholder="Observaciónes" name="observacion" required></textarea>
                    <button type="submit" name="submit">Insertar Inmueble</button>
                </form>
            </fieldset>
            <?php
            if ($_SERVER["REQUEST_METHOD"] === "POST") {
                if (isset($_POST["submit"])) {
                    $tipoInmueble = $_POST["tipoInmueble"];
                    $domicilio = $_POST["domicilio"];
                    $cantidadDormitorios = $_POST["cantidadDormitorios"];
                    $mejoras = $_POST["mejoras"];
                    $cantidadBanios = $_POST["cantidadBanios"];
                    $observacion = $_POST["observacion"];
                    $conexion = new mysqli("localhost", "root", "", "inmobiliaria") or die("Error de conexión");
                    $query = "INSERT INTO inmueble (tipoInmueble, domicilio, cantidadDormitorios, mejoras, cantidadBanios, observacion) 
                              VALUES ('$tipoInmueble', '$domicilio', $cantidadDormitorios, '$mejoras', $cantidadBanios, '$observacion')";
                    $conexion->query($query) or die("Error en la consulta");
                    $conexion->close();
                }
            }
            ?>
        <button id="volver"><a href="../1/index.php">Volver al Ejercicio 1</a></button>
        </article>
    </section>
</body>
</html>