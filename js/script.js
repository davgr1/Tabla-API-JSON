//direccion del endpoint generado en retool
const API_URL = "https://retoolapi.dev/4zmTCg/integrantes";

//funcion que llama a la api y realiza una solicitud get. Obtiene UN JSON
async function ObtenerRegistros(){
    //hacemos get a la api servidor y obtenemos su respuesta  (responder)
    const respuesta = await fetch(API_URL);
    //obtenemos los datos en forma JSON a partir de la repuesta
    const data = await respuesta.json(); //esto ya es un JSON

    //llamamos a mostrarregistro y le enviamos el JSON
    MostrarRegistros(data);
}

//funcion para generar las filas d ela tabla
//"datos" representa al SJON
function MostrarRegistros(datos){

    //se llama al elemento tbody dentro de la latbla con id "tabla"
    const tabla = document.querySelector("#tabla tbody");

    //para inyectar codigo HTML usamos innerHTML
    tabla.innerHTML = ""; //vaciamos el contenido de la tabla

    datos.forEach(persona => {
        tabla.innerHTML += `
            <tr>
                <td>${persona.id}</td>
                <td>${persona.nombre}</td>
                <td>${persona.apellido}</td>
                <td>${persona.correo}</td>
                <td>
                    <button>Editar</button>
                    <button>Eliminar</button>
                </td>
            </tr>
       `;
    }); //por cada persona en el JSON datos 
}

ObtenerRegistros();