<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>compara</title>
    <script src="script.js"  type="text/javascript"></script>
    <link rel="stylesheet" href="style.css">
</head>
<body id="containerMain">
    <div>
    <header>Comparadora</header>
    <div id="div_first">
    ingrese el nombre del producto
    <input type="text" id="nombreProd">
    <button onclick="buscaProductos()">Buscar</button>
    ingrese el nombre del producto
    <input type="text" id="nombreUbi">
    <button onclick="buscaProductos()">Buscar</button>
    buscar ambos <button onclick="buscaProductos()">buscar</button>
    </div>
    <div>
        
    </div>
    <div id="tablas">
    <table>
        <tr>
            <th>PRODUCTO</th>
            <th>PRECIO</th>
            <th>SUPERMERCADO</th>
            <th>UBICACION</th>
            <th>DETALLE</th>
        </tr>
        <tbody id="cuerpoTabla">

        </tbody>
    </table>
<div id="div_second">
    <table>
        <tr>
        <th>PRODUCTO</th>
            <th>PRECIO</th>
            <th>SUPERMERCADO</th>
        </tr>
        <tbody id="cuerpoTablaDetalle">

        </tbody>
    </table>
    <div id="precioBajo">

    </div>
    <div id="precioAlto">

    </div>
    <div id="supermercado">

    </div>
    <div id="diferencia">

    </div>
</div>
</div>
</div>
<footer>comparadora</footer>
</body>
</html>