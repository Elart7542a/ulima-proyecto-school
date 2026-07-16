console.log("MODULO APODERADOS CARGADO");

const API_APODERADOS = "http://localhost:3000/api/apoderados";

let modoEdicionApoderado = false;
let apoderadoEditando = null;

//=========================================
// CARGAR APODERADOS
//=========================================

async function cargarApoderados() {

    try {

        const respuesta = await fetch(API_APODERADOS);

        const apoderados = await respuesta.json();

        const buscador = document.getElementById("buscarApoderado");

        let textoBuscar = "";

        if (buscador) {

            textoBuscar = buscador.value.toLowerCase().trim();

        }

        const tbody = document.querySelector("#tablaApoderados tbody");

        tbody.innerHTML = "";

        let filas = "";

        apoderados

        .filter(apoderado => {

            return (

                apoderado.ID_APODERADO.toString().includes(textoBuscar)

                ||

                apoderado.NOMBRE.toLowerCase().includes(textoBuscar)

                ||

                apoderado.APELLIDO.toLowerCase().includes(textoBuscar)

            );

        })

        .forEach(apoderado => {

            filas += `

            <tr>

                <td>${apoderado.ID_APODERADO}</td>

                <td>${apoderado.NOMBRE}</td>

                <td>${apoderado.APELLIDO}</td>

                <td>${apoderado.TELEFONO}</td>

                <td>${apoderado.EMAIL}</td>

                <td>

                    <button

                        class="btn-edit-apoderado"

                        data-id="${apoderado.ID_APODERADO}"

                        data-nombre="${apoderado.NOMBRE}"

                        data-apellido="${apoderado.APELLIDO}"

                        data-telefono="${apoderado.TELEFONO}"

                        data-email="${apoderado.EMAIL}">

                        <i class="bi bi-pencil-fill"></i>

                    </button>

                    <button

                        class="btn-delete-apoderado""

                        data-id="${apoderado.ID_APODERADO}">

                        <i class="bi bi-trash-fill"></i>

                    </button>

                </td>

            </tr>

            `;

        });

        tbody.innerHTML = filas;

    }

    catch(error){

        console.error(error);

        mostrarToast("No fue posible cargar los apoderados.","error");

    }

}

function iniciarModuloApoderados(){

    cargarApoderados();

}

function limpiarFormularioApoderado(){

    modoEdicionApoderado = false;

    apoderadoEditando = null;

    document.getElementById("formApoderado").reset();

    document.getElementById("idApoderado").disabled = false;

    document.getElementById("tituloModalApoderado").textContent =
        "Registrar Apoderado";

}

//=========================================
// REGISTRAR / ACTUALIZAR APODERADO
//=========================================

document.addEventListener("submit", async function(e){

    if(e.target.id !== "formApoderado") return;

    e.preventDefault();

    const apoderado = {

        id_apoderado: Number(document.getElementById("idApoderado").value),

        nombre: document.getElementById("nombre").value,

        apellido: document.getElementById("apellido").value,

        telefono: document.getElementById("telefono").value,

        email: document.getElementById("email").value

    };

    try{

        const url = modoEdicionApoderado

            ? `${API_APODERADOS}/${apoderadoEditando}`

            : API_APODERADOS;

        const metodo = modoEdicionApoderado

            ? "PUT"

            : "POST";

        const respuesta = await fetch(url,{

            method: metodo,

            headers:{
                "Content-Type":"application/json"
            },

            body: JSON.stringify(apoderado)

        });

        const datos = await respuesta.json();

        if(!respuesta.ok){

            throw new Error(datos.error);

        }

        mostrarToast(datos.mensaje,"success");

        document.getElementById("modalApoderado").style.display = "none";

        limpiarFormularioApoderado();

        cargarApoderados();

    }

    catch(error){

        mostrarToast(error.message,"error");

    }

});

//=========================================
// EDITAR APODERADO
//=========================================

document.addEventListener("click", function(e){

    const boton = e.target.closest(".btn-edit-apoderado");

    if(!boton) return;

    modoEdicionApoderado = true;

    apoderadoEditando = boton.dataset.id;

    document.getElementById("tituloModalApoderado").textContent =
        "Editar Apoderado";

    document.getElementById("idApoderado").value =
        boton.dataset.id;

    document.getElementById("idApoderado").disabled = true;

    document.getElementById("nombre").value =
        boton.dataset.nombre;

    document.getElementById("apellido").value =
        boton.dataset.apellido;

    document.getElementById("telefono").value =
        boton.dataset.telefono;

    document.getElementById("email").value =
        boton.dataset.email;

    document.getElementById("modalApoderado").style.display = "flex";

});

//=========================================
// ELIMINAR APODERADO
//=========================================

document.addEventListener("click", async function(e){

    const boton = e.target.closest(".btn-delete-apoderado");

    if(!boton) return;

    const id = boton.dataset.id;

    const confirmar = confirm(
        "¿Está seguro de eliminar este apoderado?"
    );

    if(!confirmar) return;

    try{

        const respuesta = await fetch(`${API_APODERADOS}/${id}`,{

            method:"DELETE"

        });

        const datos = await respuesta.json();

        if(!respuesta.ok){

            throw new Error(datos.error);

        }

        mostrarToast(datos.mensaje,"success");

        cargarApoderados();

    }

    catch(error){

        mostrarToast(error.message,"error");

    }

});

//=========================================
// BUSCADOR
//=========================================

document.addEventListener("input", function(e){

    if(e.target.id === "buscarApoderado"){

        cargarApoderados();

    }

});