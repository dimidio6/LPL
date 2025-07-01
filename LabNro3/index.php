<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="style.css">
    <script type="text/javascript" src="script.js"></script>
    <title>LabNro3_Duarte</title>
</head>
<body>
    <header><h1>Consumidores unidos</h1></header>
    <section>
        <div>
            <label for="ubicaciones">B&uacute;squeda por Ubicaci&oacute;n</label>
            <select id="ubicaciones" name="ubicaciones">
                <option id="todos" selected value="">Todos</option>
                <?php
                include_once("producto.class.php");
                $listaUbicaciones = producto::getUbicacionesBD();
                if (count($listaUbicaciones)>0) {
                    foreach ($listaUbicaciones as $ubicacion) {
                        echo '<option value="'.$ubicacion.'">'.$ubicacion.'</option>';
                    }
                }
                ?>
            </select>
        </div>
        <label for="input_busqueda">B&uacute;squeda por Producto</label>
        <input type="text" id="input_busqueda" name="input_busqueda">
        <article>
            <table>
                <thead>
                    <tr>
                        <th>Producto</th>
                        <th>Precio</th>
                        <th>Supermercado</th>
                        <th>Ubicaci&oacute;n</th>
                    </tr>
                </thead>
                <tbody id="cuerpo_tabla">
                </tbody>
            </table>
        </article>
        <dialog id="modal">
            <h3 id="nombre_productoDetalles"></h3>
            <table id="tablaDetalles">
                <thead>
                    <tr>
                        <th>Supermercado</th>
                        <th>Precio</th>
                        <th>Ubicaci&oacute;n</th>
                    </tr>
                </thead>
                <tbody id="cuerpo_tablaDetalles">
                </tbody>
            </table>
            <p id="menor_precio"></p>
            <p id="diferencia_precio"></p>
            <form method="dialog">
                <button id="btnCerrar_dialog">Cerrar</button>
            </form>
        </dialog>
    </section>
    <footer>Lab N°3 - Angelo Duarte</footer>
</body>
</html>