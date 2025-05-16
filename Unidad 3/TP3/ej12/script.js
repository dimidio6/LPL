function chequeo_registro(nombre, apellido) { // entran los values de los input como parámetros

    var expiracion = 40; // duración de la cookie
    var nom_cookie = "nombre=" // name de la cookie nombre
    var ape_cookie = "apellido=" // name de la cookie apellido
    var vis_cookie = "visitas" // name de la cookie visitas
    var fecha_cookie = "fecha" // name de la cookie fecha
    var pos_cookie_nom = document.cookie.search(nombre); // devuelve el índice de la 1° coincidencia
    var pos_cookie_ape = document.cookie.search(apellido);

    var fecha = new Date().toLocaleString('es-AR'); // fecha en formato: dia/mes/año

    if (pos_cookie_nom == -1 || pos_cookie_ape == -1) // si devuelve -1 significa que la cookie no existe
    {   // entonces creo las cookies
        document.cookie = nom_cookie + nombre + "; max-age=" + expiracion;
        document.cookie = ape_cookie + apellido + "; max-age=" + expiracion;
        document.cookie = vis_cookie +"=1; max-age=" + expiracion;
        document.cookie = fecha_cookie + "=" + fecha + "; max-age=" + expiracion;
        document.getElementById("info").innerHTML = "Usuario registrado";
        console.log(fecha);
    }
    else {
        // imprimo
        document.getElementById("info").innerHTML = "Datos del usuario";
        document.getElementById("p_nombre").innerHTML = "Nombre: " + nombre;
        document.getElementById("p_apellido").innerHTML = "Apellido: " + apellido;
        document.getElementById("p_visitas").innerHTML = "Cantidad de visitas: "+actualizar_contador(vis_cookie,expiracion);
        document.getElementById("p_ultimo_acceso").innerHTML = "Último acceso: "+set_cookie(fecha_cookie,fecha,expiracion);
    }
}
function actualizar_contador(nombre_cookie,expiracion) {
    let posCookie = document.cookie.search(nombre_cookie); // busca la cookie;
    let posIgual = document.cookie.indexOf("=",posCookie); // se posiciona en el "="
    let contador = parseInt(document.cookie.substring(posIgual+1))+1; // a la posición siguiente al "=" le suma 1 (o sea el contador)
    document.cookie = nombre_cookie+"="+contador+"; max-age="+expiracion; // creo la nueva cookie actualizada
    return contador;
}
function set_cookie(nombre_cookie,valor,expiracion) {
    document.cookie = nombre_cookie+"="+valor+"; max-age="+expiracion;
    return valor;
}