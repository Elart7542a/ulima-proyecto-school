const API = "http://localhost:3000/api/personal";

let modoEdicionPersonal = false;

let personalEditando = null;

//=========================================
// CARGAR PERSONAL
//=========================================

async function cargarPersonal() {

    try {

        const respuesta = await fetch(API);

        const personal = await respuesta.json();

        const buscador = document.getElementById("buscarPersonal");

        let textoBuscar = "";

        if (buscador) {

            textoBuscar = buscador.value.toLowerCase().trim();

        }

        const tbody = document.querySelector("#tablaPersonal tbody");

        tbody.innerHTML = "";

        let filas = "";

        personal

        .filter(persona => {

            return (

                persona.ID_PERSONAL.toString().includes(textoBuscar) ||

                persona.NOMBRE.toLowerCase().includes(textoBuscar) ||

                persona.APELLIDO.toLowerCase().includes(textoBuscar) ||

                persona.DNI.includes(textoBuscar)

            );

        })

        .forEach(persona => {

            filas += `
                <tr>

                    <td>${persona.ID_PERSONAL}</td>
                    <td>${persona.NOMBRE}</td>
                    <td>${persona.APELLIDO}</td>
                    <td>${persona.DNI}</td>
                    <td>${persona.TELEFONO}</td>
                    <td>${persona.ID_TIPO}</td>
                    <td>${persona.ID_SALON}</td>

                    <td>

                        <button
                            class="btn-edit-personal"
                            data-id="${persona.ID_PERSONAL}"
                            data-nombre="${persona.NOMBRE}"
                            data-apellido="${persona.APELLIDO}"
                            data-dni="${persona.DNI}"
                            data-telefono="${persona.TELEFONO}"
                            data-tipo="${persona.ID_TIPO}"
                            data-salon="${persona.ID_SALON}">

                            <i class="bi bi-pencil-fill"></i>

                        </button>

                        <button
                            class="btn-delete-personal"
                            data-id="${persona.ID_PERSONAL}">

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

        mostrarToast("No fue posible cargar los personal.","error");

    }

}

function iniciarModuloPersonal(){

    cargarPersonal();

}

function limpiarFormularioPersonal(){

    modoEdicionPersonal = false;

    personalEditando = null;

    document.getElementById("formPersonal").reset();

    document.getElementById("idPersonal").disabled = false;

    document.getElementById("tituloModalPersonal").textContent =
        "Registrar Personal";

}

//=========================================
// REGISTRAR / ACTUALIZAR PERSONAL
//=========================================

document.addEventListener("submit", async function(e){

    if(e.target.id !== "formPersonal") return;

    e.preventDefault();

    const personal = {

        id_personal: Number(document.getElementById("idPersonal").value),

        nombre: document.getElementById("nombre").value,

        apellido: document.getElementById("apellido").value,

        dni: document.getElementById("dni").value,

        telefono: document.getElementById("telefono").value,

        id_tipo: Number(document.getElementById("idTipo").value),

        id_salon: Number(document.getElementById("idSalon").value)

    };

    try{

        const url = modoEdicionPersonal

            ? `${API}/${personalEditando}`

            : API;

        const metodo = modoEdicionPersonal

            ? "PUT"

            : "POST";

        const respuesta = await fetch(url,{

            method: metodo,

            headers:{
                "Content-Type":"application/json"
            },

            body: JSON.stringify(personal)

        });

        const datos = await respuesta.json();

        if(!respuesta.ok){

            throw new Error(datos.error);

        }

        mostrarToast(datos.mensaje,"success");

        document.getElementById("modalPersonal").style.display = "none";

        limpiarFormularioPersonal();

        cargarPersonal();

    }

    catch(error){

        mostrarToast(error.message,"error");

    }

});

//=========================================
// EDITAR PERSONAL
//=========================================

document.addEventListener("click", function(e){

    const boton = e.target.closest(".btn-edit-personal");

    if(!boton) return;

    modoEdicionPersonal = true;

    personalEditando = boton.dataset.id;

    document.getElementById("tituloModalPersonal").textContent =
        "Editar Personal";

    document.getElementById("idPersonal").value =
        boton.dataset.id;

    document.getElementById("idPersonal").disabled = true;

    document.getElementById("nombre").value =
        boton.dataset.nombre;

    document.getElementById("apellido").value =
        boton.dataset.apellido;

    document.getElementById("dni").value =
        boton.dataset.dni;

    document.getElementById("telefono").value =
        boton.dataset.telefono;

    document.getElementById("idTipo").value =
        boton.dataset.tipo;

    document.getElementById("idSalon").value =
        boton.dataset.salon;

    document.getElementById("modalPersonal").style.display =
        "flex";

});

//=========================================
// ELIMINAR PERSONAL
//=========================================

document.addEventListener("click", async function(e){

    const boton = e.target.closest(".btn-delete-personal");

    if(!boton) return;

    const id = boton.dataset.id;

    const confirmar = confirm(
        "¿Está seguro de eliminar este personal?"
    );

    if(!confirmar) return;

    try{

        const respuesta = await fetch(`${API}/${id}`,{

            method:"DELETE"

        });

        const datos = await respuesta.json();

        if(!respuesta.ok){

            throw new Error(datos.error);

        }

        mostrarToast(datos.mensaje,"success");

        cargarPersonal();

    }

    catch(error){

        mostrarToast(error.message,"error");

    }

});

//=========================================
// BUSCADOR
//=========================================

document.addEventListener("input", function(e){

    if(e.target.id === "buscarPersonal"){

        cargarPersonal();

    }

});