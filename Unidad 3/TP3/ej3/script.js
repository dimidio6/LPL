var dni, letra;

function ingreso() {
    ingreso_dni()
    ingreso_letra()
    corroborar_letra()
}
function ingreso_dni() { // ingreso y consistencia
    dni_valido = false;
    while (!dni_valido) {
        dni = prompt("Ingrese su número de DNI:")
        if (dni !== null && !isNaN(dni) && dni.trim() !== "" && dni >= 0 && dni <= 99999999) // 1°: q no se cancele el prompt. 2°: sea numero. 3°: trim() elimina espacios en blanco de una cadena. se asegura q no sea solo espacio en blanco
            dni_valido = true;
        else
            alert("DNI inválido. Ingrese un número sin puntos menor a 9 dígitos:")
    }
    alert("DNI ingresado con éxito.")
}
function ingreso_letra() { // ingreso y consistencia
    letra_valida = false;
    while (!letra_valida) {
        letra = prompt("Ingrese la letra (mayúscula) asociada a su DNI:").trim() // .trim() elimina espacios en blanco
        if (letra !== null && (/^[A-Z]$/.test(letra))) //   /^[ ]$/ -> las letras que permite. test() corrobora la condición en la cadena
            letra_valida = true;
        else
            alert("Ingreso inválido. Ingrese una sola letra en mayúsculas:")
    }
    alert("Letra ingresada con éxito.")
}
function calculo_letra() {
    let letras = ['T', 'R', 'W', 'A', 'G', 'M', 'Y', 'F', 'P', 'D', 'X', 'B', 'N', 'J', 'Z', 'S', 'Q', 'V', 'H', 'L', 'C', 'K', 'E', 'T'];
    return letras[dni % 23]; // retorna la letra en la posición que dé el resto de: dni/23
}
function corroborar_letra() {
    let bienvenida = document.getElementById("bienvenida");
    let mensaje = document.getElementById("mensaje");
    if (calculo_letra() == letra)
        bienvenida.innerHTML = "Bienvenido usuario " + dni;
    else
        mensaje.innerHTML = "La letra ingresada no es correcta.";
}