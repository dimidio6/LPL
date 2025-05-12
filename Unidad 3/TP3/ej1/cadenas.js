function ingreso() {
    // Definicion de variables
    var cadena;
    //
    cadena = prompt("Ingrese una palabra: ");
    if (cadena == cadena.toLowerCase())
        { document.write("La palabra está en minúscula."); }
    else if (cadena == cadena.toUpperCase())
        { document.write("La palabra está en mayúscula."); }
    else
        { document.write("La palabra contiene mayúsculas y minúsculas."); }
}