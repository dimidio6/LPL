<?php session_start();	?>
<html>
<head>
<title>Sesiones - P&aacute;gina 2</title>
</head>

<body>
<?php
require_once("Funciones.req.php");
if (isset($_SESSION['usuario']))
{	//El usuario est� autenticado, por lo tanto puede acceder a la p�gina 
	muestro_menu_opciones();
	muestro_pagina("P�gina 2");
}
else
{	//No es un usuario v�lido. Muestro v�nculo para que inicie sesi�n
	muestro_mensaje_usuario_no_valido();
}

?>
</body>
</html>
