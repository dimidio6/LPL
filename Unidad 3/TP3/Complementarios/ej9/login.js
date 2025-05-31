function getCookie(nombreCookie) {
    let cookies = document.cookie;
    let pos = cookies.search(nombreCookie + "=");
    if (pos === -1) {
        return "";
    } else {
        let principio = pos + nombreCookie.length + 1;
        let fin = cookies.indexOf(";", principio);
        if (fin === -1) {
            fin = cookies.length;
        }
        return cookies.substring(principio, fin);
    }
}

function setCookie(nombre, tiempo, valor) {
    let nombreCookie = nombre
    let tiempoCookie = tiempo
    let valorCookie = valor

    document.cookie = nombreCookie + "=" + valorCookie + "; max-age=" + tiempoCookie;
}

function delCookie(nombre) {
  document.cookie = nombre + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
}

function mezclar(array) {
    for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

document.addEventListener("DOMContentLoaded", () => {

    button_ingreso.addEventListener("click", () => {
        if (input_user.value != "") { // valido que no ingrese espacio en blanco
            setCookie("usuario_"+input_user.value,3600,input_user.value); // crea una cookie por cada usuario
            setCookie("usuario_actual",3600,input_user.value); // actualiza la cookie de usuario actual
        }
        window.location.href="./tienda.html";
    })
})