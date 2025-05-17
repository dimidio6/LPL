document.addEventListener("DOMContentLoaded", () => { // dentro está lo que se ejecuta cuando carga el DOM

    var error = "LocalStorage no es soportado por este navegador web" // mensaje de error

    function chequea_ingreso() {
        let cant_visitas = localStorage.getItem("cant_visitas");
        if (cant_visitas == null) // o sea si nunca ingresó
        {
            cant_visitas = 1;
            console.log("Primera visita");
            var nombre = document.getElementById("id_nombre");
            var apellido = document.getElementById("id_apellido");
            // creo los inputs dinámicamente para insertar nombre y apellido
            const nombre_input = document.createElement("input")
            nombre_input.type = "text"
            nombre_input.id = "input_nombre"
            nombre_input.name = "Nombre";
            const apellido_input = document.createElement("input")
            apellido_input.type = "text"
            apellido_input.id = "input_apellido"
            apellido_input.name = "Apellido";
        }
    }
})