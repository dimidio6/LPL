var num; // variable global

function ingreso() {
    num = prompt("Ingrese un número: ");
    imprimo();
}
function imprimo() {
    let numero_ingresado = document.getElementById("numero"); // obtiene el span con id "numero" del HTML
    numero_ingresado.innerHTML = " " + num; // inserta el número en el span "numero" del HTML
    paridad()
    divi3()
    divi5()
    primo()
}
function paridad() { // comprueba la paridad y si es divisible por 2 a la vez (es lo mismo)
    let es_par = document.getElementById("paridad");
    let es_div = document.getElementById("divisible2");
    if (num % 2 === 0)
        {es_par.innerHTML = " Par"
        es_div.innerHTML = " Si"}
    else
        {es_par.innerHTML = " Impar"
        es_div.innerHTML = " No"}
}
function divi3() {
    let es_div = document.getElementById("divisible3");
    es_div.innerHTML = (num % 3 === 0) ? " Si" : " No"; // if corto. ? es el then, : es el else
}
function divi5() {
    let es_div = document.getElementById("divisible5");
    es_div.innerHTML = (num % 5 === 0) ? " Si" : " No";
}
function primo() {
    let es_primo = document.getElementById("primo");
    es_primo.innerHTML = calcula_primo() ? " Si" : " No";
}
function calcula_primo() {
    const raiz = Math.sqrt(num); // raíz de num
    if (num == 2) // 2 es el único primo par
        return true
    else if (num <= 1 || num % 2 == 0) // numeros <= 1 y pares mayores a 2 no son primos
        return false;
    else
        for (let i = 3; i <= raiz; i += 2) // verifica divisores impares hasta la raíz cuadrada. Partes del for: (inicio, condición, actualización)
            {if (num % i == 0) return false;}
        return true;
}

// muy tarde me di cuenta que imprimo texto en todas las funciones y capaz estaría mejor hacerlo solo en la de "imprimo"
// y que cada función solo de booleanos, pero ya es un laburo cambiarlo y son las 3am.