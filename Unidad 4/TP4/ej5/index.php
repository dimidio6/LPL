<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="style.css">
    <title>Alimento</title>
</head>
<body>
    <header><h1>Calculadora de alimento</h1></header>
    <?php

    function calcular_alimento($cantidad,$tipo) {
        $dias_mes = 30;
        $tipo = $tipo*1000; // pasamos el tipo de bolsa a Gramos
        return ($dias_mes*$cantidad)/$tipo; // regla de 3
    }
    if (isset($_POST['btnCalcular']) && $_POST['btnCalcular']=="calcular") { // isset comprueba que el parámetro está declarado y no es null
        if (isset($_POST['mascota']) && isset($_POST['cantAlimento']) && isset($_POST['tipoBolsa'])) {
            $cantidad = filter_var($_POST['cantAlimento'], FILTER_VALIDATE_FLOAT); // pasa el valor a flotante
            $tipo = filter_var($_POST['tipoBolsa'], FILTER_VALIDATE_FLOAT); // pasa el valor a flotante
            $total = calcular_alimento($cantidad,$tipo);
        }
    }
    ?>
    <section>
        <article>
            <form action="<?php echo htmlspecialchars($_SERVER['PHP_SELF']); ?>" method="post">
                <div>
                    <label for="mascota">Mascota</label>
                    <select name="mascota">
                        <?php
                        $mascotas = ["Fox Terrier", "Labrador", "Caniche", "Chiguagua"]; // hago una lista por si quiero agregar más mascotas
                        foreach ($mascotas as $mascota) {
                            echo "<option value=\"$mascota\">$mascota</option>"; // agrego toda la lista como option
                        }
                        ?>
                    </select>
                </div>
                <div>
                    <label for="cantAlimento">Cantidad Alimento</label>
                    <input type="number" name="cantAlimento">
                    <label for="cantAlimento">Gramos</label>
                </div>
                <div>
                    <label for="tipoBolsa">Tipo de bolsa</label>
                    <select name="tipoBolsa">
                        <?php
                        $tipos = [0.5,1,3];
                        foreach ($tipos as $tipo) {
                            echo "<option value=\"$tipo\">$tipo</option>";
                        }
                        ?>
                    </select>
                    <label for="tipoBolsa">Kilogramos</label>
                </div>
                <div>
                    <label>Total de bolsas</label>
                    <?php
                    if (isset($total)) {
                        echo "Debe comprar ".$total." bolsas";
                    }
                    ?>
                </div>
                <button type="submit" name="btnCalcular" value="calcular">Calcular</button>
            </form>
        </article>
    </section>
</body>
</html>