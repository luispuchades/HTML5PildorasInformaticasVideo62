/*global window */
/*global alert */
/*jslint browser: true, for:true */

//JavaScript Document

/**Curso: HMTL5 - Pildoras Informáticas - API File IX
 * Origin: Capitulo62.html ==> Escribiendo archivos II
 */

// "use strict";

//1. Definición de Objetos y Variables
var zonaDatos;
var botonAceptar;
var espacio;
var archivoOrigen;


//1.1 Extracción de elementos desde HTML
zonaDatos = document.getElementById("zona-datos");
botonAceptar = document.getElementById("boton-aceptar");
archivoOrigen = document.getElementById("archivo-origen").value;


function errores (error) {
    'use strict';

    alert("Ha habido un error" + error.code);
}

function crearSys(system) {
    'use strict';

    espacio = system.root;

}

function accesoEspacio() {
    'use strict';

//Indicamos que requerimos un espacio permanente (persistente)
    window.webkitRequestFileSystem(PERSISTENT, 5*1024*1024, crearSys, errores);
    window.mozRequestFileSystem(PERSISTENT, 5*1024*1024, crearSys, errores);
}

function mostrarResultado(entrada) {
    'use strict';

    zonaDatos.innerHTML = "Archivo creado con éxito";


}

function exito(e) {
    'use strict';
    var resultado;
// Le pasamos como evento el objeto que ha desencadenado el evento.
// En este caso, en la función leerContenido, el objeto que ha
// desecadenado el evento es lector, al aplicarle "onload".

// Asignamos a la variable resultado el objeto que ha desencadenado
// el evento
    resultado = e.target.result;


// Reseteamos los campos de captura de texto y nombre del fichero
    document.getElementById("archivo-origen").value = "";

    zonaDatos.innerHTML += "Contenido: " + resultado;

    mostrarResultado();
}

function leerContenido (archivo) {
    'use strict';

    var lector;

// Añadimos el nombre y contenido del parametro "archivo" a
// la zona de datos

    zonaDatos.innerHTML = "Nombre: " + archivo.name + <br />;
    zonaDatos.innerHTML += "Tamaño: " + archivo.size + "bytes <br />";

// Creamos un objeto lector, con el constructor FileReader
    lector = new FileReader();

    lector.onload = exito;
    lector.readAsText(archivo);

}

function leerArchivo() {
    'use strict';

    espacio.getFile(archivoOrigen, {create: true, exclusive: false}, function (entrada) {
        entrada.file(leerContenido, errores);
    }, errores);
}


function comenzar() {
    'use strict';

    botonAceptar.addEventListener("click", leerArchivo, false);


/**
 * Determinamos si el espacio debe ser temporal o permanente
 * Aun no es estandard y hay que usar prefijos de navegador (webkit, moz y ms)
 * Pedimos permiso al navegador para acceder a nuestro disco duro
 * Reservamos con requestQuota 5MB = (5 * 1024 bits/KB *...
 * ... * 1024 KB/MB)
 */

    navigator.webkitPersistentStorage.requestQuota(5*1024*1024, accesoEspacio)
    navigator.mozPersistentStorage.requestQuota(5*1024*1024, accesoEspacio)
}




//3. Asignación de Eventos
document.addEventListener("DOMContentLoaded", comenzar, false);
