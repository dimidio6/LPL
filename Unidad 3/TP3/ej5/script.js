document.addEventListener("DOMContentLoaded", () => { // para añadir eventos al DOM

    const imagenes = document.querySelectorAll('.imagenes img'); // selecciona todos los elementos q esten en imagenes e img y los devuelve en un NodeList
    const imagen_abierta = document.getElementById("imagen_abierta");
    const modal = document.getElementById("modal"); // modal = para una ventana emergente o superpuesta sobre el contenido principal
    const boton_cerrar = document.getElementById("cerrar");

    imagenes.forEach(img => { // para cada, como un for
        img.addEventListener('click', () => { // añade el evento click
            imagen_abierta.src = img.src; // le asigna la imagen a la que se le hizo click
            modal.showModal(); // showModal() muestra el dialog como un modal
        })
    });

    boton_cerrar.addEventListener('click', () => {
        modal.close();
    });

});