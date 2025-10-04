function buscaProductos(
){
    console.log('a');
    if(document.getElementById("nombreProd").value!=""&& document.getElementById("nombreUbi").value==""){
        var nombre =  document.getElementById("nombreProd").value;
        var peticion = new XMLHttpRequest();
        peticion.open("GET","procesaProductoNombre.php?nombre="+nombre,true);
        peticion.onreadystatechange = cargaProductos;
        peticion.send(null);
        function cargaProductos(){
            if(peticion.readyState === 4 && peticion.status === 200){
                console.log("a");
                console.log(peticion.responseText);
                var datos = JSON.parse(peticion.responseText);
                var tabla = document.getElementById("cuerpoTabla");
                tabla.innerHTML = '';
                var precioBajo= 0;
                var precioAlto = 0;
                console.log(datos);
                
                datos.forEach(producto => {
    
                    var tr = document.createElement('tr');
                    console.log(producto.precio);
                    var td = document.createElement('td');
                    td.textContent = producto.nombreProducto;
                    tr.appendChild(td);
                    var td = document.createElement('td');
                    td.textContent = producto.precio;
                    tr.appendChild(td);
                    var td = document.createElement('td');
                    td.textContent = producto.supermercado;
                    tr.appendChild(td);
                    var td = document.createElement('td');
                    td.textContent = producto.ubicacion;
                    tr.appendChild(td);
                    var td = document.createElement('td');
                    var boton = document.createElement('button');
                    boton.id = 'btnDetalle';
                    boton.textContent = 'verDetalle';
                    boton.onclick = function(){
                        verDetalle(producto.nombreProducto);
                    };
                    td.appendChild(boton);
                     tr.appendChild(td);
                    tabla.appendChild(tr);

                });
            }
        }

    }
    if(document.getElementById("nombreUbi").value!="" &&  document.getElementById("nombreProd").value==""){
        var nombre =  document.getElementById("nombreUbi").value;
        var peticion = new XMLHttpRequest();
        peticion.open("GET","procesaProductoNombre.php?ubicacion="+nombre,true);
        peticion.onreadystatechange = cargaProductos;
        peticion.send(null);
        function cargaProductos(){
            if(peticion.readyState === 4 && peticion.status === 200){
                console.log("a");
                console.log(peticion.responseText);
                var datos = JSON.parse(peticion.responseText);
                var tabla = document.getElementById("cuerpoTabla");
                tabla.innerHTML = '';

                console.log(datos);
                datos.forEach(producto => {
                    var tr = document.createElement('tr');

                    console.log(producto.precio);
                    var td = document.createElement('td');
                    td.textContent = producto.nombreProducto;
                    tr.appendChild(td);
                    var td = document.createElement('td');
                    td.textContent = producto.precio;
                    tr.appendChild(td);
                    var td = document.createElement('td');
                    td.textContent = producto.supermercado;
                    tr.appendChild(td);
                    var td = document.createElement('td');
                    td.textContent = producto.ubicacion;
                    tr.appendChild(td);
                    var td = document.createElement('td');
                    var boton = document.createElement('button');
                    boton.id = 'btnDetalle';
                    boton.textContent = 'verDetalle';
                    boton.onclick = function(){
                        verDetalle(producto.nombreProducto);
                    };
                    td.appendChild(boton);
                     tr.appendChild(td);
                    tabla.appendChild(tr);

                });
            }
        }

    
    }
    if(document.getElementById("nombreProd").value!=""&& document.getElementById("nombreUbi").value!=""){
        var nombre =  document.getElementById("nombreProd").value;
        var ubicacion =  document.getElementById("nombreUbi").value;

        var peticion = new XMLHttpRequest();
        peticion.open("GET","procesaProductoNombre.php?nombre="+nombre+"&ubicacion="+ubicacion,true);
        peticion.onreadystatechange = cargaProductos;
        peticion.send(null);
        function cargaProductos(){
            if(peticion.readyState === 4 && peticion.status === 200){
                console.log("a");
                console.log(peticion.responseText);
                var datos = JSON.parse(peticion.responseText);
                var tabla = document.getElementById("cuerpoTabla");
                tabla.innerHTML = '';

                console.log(datos);
                
                datos.forEach(producto => {
                    var tr = document.createElement('tr');

                    console.log(producto.precio);
                    var td = document.createElement('td');
                    td.textContent = producto.nombreProducto;
                    tr.appendChild(td);
                    var td = document.createElement('td');
                    td.textContent = producto.precio;
                    tr.appendChild(td);
                    var td = document.createElement('td');
                    td.textContent = producto.supermercado;
                    tr.appendChild(td);
                    var td = document.createElement('td');
                    td.textContent = producto.ubicacion;
                    tr.appendChild(td);

                    var td = document.createElement('td');
                    var boton = document.createElement('button');
                    boton.id = 'btnDetalle';
                    boton.textContent = 'verDetalle';
                    boton.onclick = function(){
                        verDetalle(producto.nombreProducto);
                    };
                    td.appendChild(boton);
                     tr.appendChild(td);

                    tabla.appendChild(tr);

                });
            }
        }

    }
}


function verDetalle(nombre){
    var peticion = new XMLHttpRequest();
    peticion.open("GET","procesaProductoNombre.php?nombre="+nombre,true);
    peticion.onreadystatechange = cargaProductos;
    peticion.send(null);
    function cargaProductos(){
        if(peticion.readyState === 4 && peticion.status === 200){
            console.log("a");
                console.log(peticion.responseText);
                var datos = JSON.parse(peticion.responseText);
                var tabla = document.getElementById("cuerpoTablaDetalle");
                tabla.innerHTML = '';
                var precioAlto = 0;
                var precioBajo = 0;
                var supermercado = "";
                console.log(datos);
            datos.forEach(producto => {
                var tr = document.createElement('tr');

                console.log(producto.precio);
                var td = document.createElement('td');
                td.textContent = producto.nombreProducto;
                tr.appendChild(td);
                var td = document.createElement('td');
                td.textContent = producto.precio;
                tr.appendChild(td);
                var td = document.createElement('td');
                td.textContent = producto.supermercado;
                tr.appendChild(td);
                tabla.appendChild(tr);
                if(precioAlto<producto.precio){
                    precioAlto = producto.precio;
                }
                if(precioBajo==0){
                    precioBajo = producto.precio;
                }
                if(producto.precio<precioBajo){
                    precioBajo = producto.precio;
                    supermercado = producto.supermercado;
                }
            })
            document.getElementById("precioAlto").textContent = 'Precio mas alto:' + precioAlto;
            document.getElementById("precioBajo").textContent += 'Precio mas bajo:' + precioBajo;
            document.getElementById("diferencia").textContent = 'Diferencia de precio de ' +(precioAlto-precioBajo) ;
            document.getElementById("supermercado").textContent = "En el supermercado:" + supermercado;

            
        
        }
    }
}