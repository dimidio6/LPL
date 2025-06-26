<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="style.css">
    <script type="text/javascript" src="script.js"></script> 
    <title>Pa&iacute;ses - ciudades</title>
</head>
<body>
    <section>
        <article>
            <select name="paises" id="paises" onChange="busco_ciudades()">
                <option value="0">-----</option>
                <?php
                include_once("pais.class.php");
                $listaPaises = pais::getPaisesBD();
                if (count($listaPaises)>0) { // si no hay países en la BDD no agrego ningún <option>
                    foreach ($listaPaises as $pais) { // por cada país en la BDD agrego un <option>
                        echo '<option value="'.$pais->getIdPais().'">'.$pais->getNombrePais().'</option>';
                    }
                }
                ?>
            </select>
            <p id="idCiudades"></p>
        </article>
    </section>
</body>
</html>