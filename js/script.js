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
                    <button onclick="AbrirModalEditar('${persona.id}', '${persona.nombre}', '${persona.apellido}', '${persona.correo}')">Editar</button>
                    <button onclick="Eliminarpersona(${persona.id})">Eliminar</button>
                </td>
            </tr>
       `;
    }); //por cada persona en el JSON datos 
}

ObtenerRegistros();


//proceso para agregar registros
const modal = document.getElementById("mdagregar"); //cuadro de dialogo
const btnAgregar = document.getElementById("btnagregar"); //boton para agregar
const btnCerrar = document.getElementById("btnCerrarModal"); //boton cerrar

btnAgregar.addEventListener("click", ()=>{
    modal.showModal(); //abre cuando a btnagregar se hace clic
});

btnCerrar.addEventListener("click", ()=>{
    modal.close(); //cerrar el modal
}); 

//agregar un nuevo integrande desde el formulario

document.getElementById("frmagregar").addEventListener("submit", async e =>{
    e.preventDefault(); //evita que los daytos se envien  por defecto

    //capturar los valores del formulario
    const nombre = document.getElementById("txtNombre").value.trim();
    const apellido = document.getElementById("txtApellido").value.trim();
    const correo = document.getElementById("txtEmail").value.trim();

    //validacion basica
    if(!nombre || !apellido ||!correo){
        alert("complete todos los campos");
        return; ///evita que el codigo se siga ejecutando 
    }

    //llamar a la API y mandar datos
    const respuesta = await fetch(API_URL, {
        method: "POST",
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify({nombre,apellido,correo})
    });

    if(respuesta.ok){
        //mensaje de confirmacion
        alert("El registro fue agregado correctamente");

        //limpiar el formulario
        document.getElementById("frmagregar").reset();

        //cerrar el ,odal (dialog)
        modal.close();

        //recargar la tabla
        ObtenerRegistros();
    }
    else{
        alert("Error castratofico sistema muerto");
    }
});

//funcion para borrar registro
async function Eliminarpersona(id){
    const confirmacion = confirm("Estas seguro ");

    //validamos si el usuario elijio aceptar
    if(confirmacion){
        await fetch(`${API_URL}/${id}`, {
            method: "DELETE"        
        }); //llamar al endpoint

        //recargarla tabla para actualizar la vista
        ObtenerRegistros(); 
    }
}

/*funcionalidad para editar registos*/
const modalEditar = document.getElementById("mdEditar");
const btncerrarEditar = document.getElementById("btnEditar");

//funcion para cerrar eñ modal
btncerrarEditar.addEventListener("click", ()=>{
    modalEditar.close();
});

function AbrirModalEditar(id, nombre, apellido, correo){
    ///agregamos os valores a los input del modal
    document.getElementById("txtIdEditar").value = id;
    document.getElementById("txtNombreEditar").value = nombre;
    document.getElementById("txtApellidoEditar").value = apellido;
    document.getElementById("txtEmailEditar").value = correo;

    //modal se abre despues de agregar los valores a los input
    modalEditar.showModal();
}

document.getElementById("frmEditar").addEventListener("submit", async e => {
    e.preventDefault(); //evitar que el formulario se envie de golpe

    //capturando los valores del formulario
    const id = document.getElementById("txtIdEditar").value;
    const nombre = document.getElementById("txtNombreEditar").value.trim();
    const apellido = document.getElementById("txtApellidoEditar").value.trim();
    const correo = document.getElementById("txtEmailEditar").value.trim();

    //validacion de los campos
    if(!id || !nombre || !apellido || !correo){
        alert("complete los campos");
        return; //evita que el codigo se siga ejecutando
    }

    //llamda a la API
    const respuesta = await fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify({correo, nombre,apellido})
    });

    if(respuesta){
        alert("registro ya fue actualizado"); //confirmacion 
        modalEditar.close(); //recargar la tabla
        document.getElementById("frmEditar").reset();

        ObtenerRegistros();
    }
    else{
        alert("Hubo un error al actualizar");
    }
});