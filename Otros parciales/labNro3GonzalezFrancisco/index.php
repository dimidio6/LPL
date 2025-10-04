<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Laboratorio 3</title>
    <link rel="stylesheet" href="estilos.css">
    <script type="text/javascript" src="script.js" ></script>
</head>
<body>
    <header>
        <h1>Consumidores Unidos</h1>
    </header>
    <nav>
        <h3>Comparador de precios de productos en distintos supermercados</h3>
    </nav>
    <section>
        <article>
            <div id="inputs">
                <input type="text" id="inputProductos" oninput="buscarProducto();">
                <select id="selectUbicacion" onchange="buscarProducto()">
                    <option value="0">----</option>
                    <?php
                    include_once("supermercado.class.php");
                    $listaSupermercado= Supermercado::obtenerUbicacionesBD();
                    if (count($listaSupermercado) > 0){
                        foreach($listaSupermercado as $super){
                            echo "<option value='".$super->getUbicacion()."'>".$super->getUbicacion()."</option>";
                        }
                    }
                ?>
                </select>
            </div>
            <p id="mensajeInput"></p>
            <table id="tablaProducto">
                
            </table>
        </article>
    </section>
    <footer>
        <h4>Laboratorio Nro 3 Gonzalez Francisco</h4>
    </footer>
</body>
</html>