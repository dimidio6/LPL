function busco_ciudades() {

    var pais = document.getElementById("paises").selectedIndex; // me devuelve el seleccionado del select "paises"
    var peticion = new XMLHttpRequest();
    peticion.open("GET", "back.php?idPais="+pais, true); // true = petición asincrónica
    peticion.onreadystatechange = cargo_ciudades; // onreadystatechange = lo q se ejecuta cada vez que la petición cambia de estado
    peticion.send(null); // envía la petición. El parámetro se utiliza cuando se envía con POST. se usa 'null' para evitar problemas de compatibilidad con navegadores.

    function cargo_ciudades() {

        if ((peticion.readyState == 4) && (peticion.status == 200)) { // si la petición está en estado 'completo' y se pudo procesar
            var obj = JSON.parse(peticion.responseText); // "desJSONifico" xd
            var parraf_ciudades = document.getElementById("idCiudades"); // referencio al <p>
            parraf_ciudades.innerHTML = obj.ciudades; // inserto en el <p>
            // console.log(obj.ciudades);
        }
    }
}