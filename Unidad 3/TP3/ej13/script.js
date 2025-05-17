document.addEventListener("DOMContentLoaded", () => { // dentro está lo que se ejecuta cuando carga el DOM

    var error = "LocalStorage no es soportado por este navegador web" // mensaje de error

    let cant_visitas = localStorage.getItem("cant_visitas");
    if (cant_visitas === null) // o sea si nunca ingresó
    {
        cant_visitas = 1;
        window.location.href = "registro.html";
    }
})