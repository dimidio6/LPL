function ingreso(usuario) {


    let texto_visitas = document.getElementById("visitas");
    let texto_acceso = document.getElementById("ultimo_ingreso");
    let fecha = new Date().toLocaleString('es-AR'); // fecha en formato: dia/mes/año
    // let gestionar = document.getElementById("gestionar");

    if (localStorage.getItem("user") !== usuario) { // corrobora si el valor asociado a "user" es = al usuario ingresado
        localStorage.setItem("user", usuario);
        localStorage.setItem("visitas", 1);
        localStorage.setItem("acceso", fecha)
        console.log("usuario registrado");
        texto_visitas.innerHTML = "Hola " + usuario + " es tu primera vez en el gestor de tareas";
        texto_acceso.innerHTML = ""
    }
    else { // en caso de que el mismo nombre de usuario ya se haya ingresado
        console.log("bienvenido de nuevo");
        let cant_visitas = localStorage.getItem("visitas");
        let acceso = localStorage.getItem("acceso");

        localStorage.setItem("visitas", parseInt(cant_visitas) + 1); // sumo +1 a las visitas
        cant_visitas = localStorage.getItem("visitas");

        texto_visitas.innerHTML = "Hola " + usuario + " es tu visita número " + cant_visitas;
        texto_acceso.innerHTML = "Último ingreso el " + acceso;

        localStorage.setItem("acceso", fecha); // actualizo el acceso   
    }
    creo_boton();
};
function creo_boton() {
    var texto_gestionar = document.getElementById("texto_gestionar");
    var gestionar = document.getElementById("gestionar");
    if (texto_gestionar.innerHTML == "") { // para asegurarme de crear el botón 1 sola vez
        console.log("creación de botón");
        texto_gestionar.innerHTML = "      ";
        var nuevo_boton = document.createElement("button");
        nuevo_boton.setAttribute("type","button");
        nuevo_boton.setAttribute("id","button_gestionar");
        nuevo_boton.setAttribute("onclick","ir_tareas()");
        nuevo_boton.innerText = "Gestionar tareas";
        gestionar.appendChild(nuevo_boton);
    }
    else (
        console.log("botón ya creado")
    )
}
function ir_tareas() {
    window.location.href = "tareas.html";
}
