console.log("MODULO ALUMNOS CARGADO");
const API_ALUMNOS = "http://localhost:3000/api/alumnos";
let modoEdicion = false;
let alumnoEditando = null;

async function cargarAlumnos() {

    console.log("Cargando alumnos...");

    try {

        const respuesta = await fetch(API_ALUMNOS);

        const alumnos = await respuesta.json();
        
        let textoBuscar = "";

        const buscador = document.getElementById("buscarAlumno");

        if (buscador) {

            textoBuscar = buscador.value.toLowerCase().trim();

        }

        console.log(alumnos);

        const tbody = document.querySelector("#tablaAlumnos tbody");

        console.log(tbody);

        tbody.innerHTML = "";

        let filas = "";

        alumnos
        .filter(alumno => {

            return (

                alumno.ID_ALUMNO.toString().includes(textoBuscar) ||

                alumno.NOMBRE.toLowerCase().includes(textoBuscar) ||

                alumno.APELLIDO.toLowerCase().includes(textoBuscar)

            );

        })

        .forEach(alumno => {

            filas += `
                <tr>
                    <td>${alumno.ID_ALUMNO}</td>
                    <td>${alumno.NOMBRE}</td>
                    <td>${alumno.APELLIDO}</td>
                    <td>${formatearFecha(alumno.FECHA_NACIMIENTO)}</td>
                    <td>${alumno.EDAD} años</td>
                    <td>${alumno.NIVEL}</td>
                    <td>${alumno.APODERADO}</td>
                    <td>
                        <button
                            class="btn-edit"
                            data-id="${alumno.ID_ALUMNO}"
                            data-nombre="${alumno.NOMBRE}"
                            data-apellido="${alumno.APELLIDO}"
                            data-fecha="${alumno.FECHA_NACIMIENTO.substring(0,10)}"
                            data-nivel="${alumno.NIVEL}"
                            data-apoderado="${alumno.ID_APODERADO}">
                            <i class="bi bi-pencil-fill"></i>
                        </button>

                        <button 
                            class="btn-delete" 
                            data-id="${alumno.ID_ALUMNO}">
                            <i class="bi bi-trash-fill"></i>
                        </button>
                    </td>
                </tr>
            `;

        });

        tbody.innerHTML = filas;

        console.log("Filas insertadas:", tbody.rows.length);

    } 
    
    catch (error) {

        console.error(error);

        mostrarToast("No fue posible cargar los alumnos.","error");

    }

}

function formatearFecha(fecha) {

    const f = new Date(fecha);

    return f.toLocaleDateString("es-PE");

}

function mostrarToast(mensaje, tipo = "success") {

    const toast = document.getElementById("toast");
    const texto = document.getElementById("toastMensaje");

    texto.textContent = mensaje;

    toast.classList.remove("toast-success");
    toast.classList.remove("toast-error");
    toast.classList.remove("toast-warning");

    if(tipo === "success"){

        toast.classList.add("toast-success");

    }

    else if(tipo === "error"){

        toast.classList.add("toast-error");

    }

    else{

        toast.classList.add("toast-warning");

    }

    toast.style.display = "flex";

    setTimeout(()=>{

        toast.style.display = "none";

    },3000);

}

function iniciarModuloAlumnos() {

    cargarAlumnos();

}

function limpiarFormulario(){

    modoEdicion = false;

    alumnoEditando = null;

    document.getElementById("formAlumno").reset();

    document.getElementById("idAlumno").disabled = false;

    document.getElementById("tituloModal").textContent =
        "Registrar Alumno";

}

//=========================================
// REGISTRAR ALUMNO
//=========================================

document.addEventListener("submit", async function(e){

    if(e.target.id !== "formAlumno") return;

    e.preventDefault();

    const alumno={

        id_alumno:Number(document.getElementById("idAlumno").value),

        nombre:document.getElementById("nombre").value,

        apellido:document.getElementById("apellido").value,

        fecha_nacimiento:document.getElementById("fechaNacimiento").value,

        nivel:document.getElementById("nivel").value,

        id_apoderado:Number(document.getElementById("idApoderado").value)

    };

    try{

        const url = modoEdicion
            ? `${API_ALUMNOS}/${alumnoEditando}`
            : API_ALUMNOS;

        const metodo = modoEdicion
            ? "PUT"
            : "POST";

        const respuesta = await fetch(url,{

            method:metodo,

            headers:{
                "Content-Type":"application/json"
            },

            body:JSON.stringify(alumno)

        });

        const datos=await respuesta.json();

        if(!respuesta.ok){

            throw new Error(datos.error);

        }

        mostrarToast(datos.mensaje, "success");

        document.getElementById("modalAlumno").style.display="none";

        limpiarFormulario();

        cargarAlumnos();

    }

    catch(error){

        mostrarToast(error.message, "error");

    }

});

document.addEventListener("click", function (e) {

    const boton = e.target.closest(".btn-edit");

    if (!boton) return;

    modoEdicion = true;

    alumnoEditando = boton.dataset.id;

    document.getElementById("tituloModal").textContent =
        "Editar Alumno";

    document.getElementById("idAlumno").value =
        boton.dataset.id;

    document.getElementById("idAlumno").disabled = true;

    document.getElementById("nombre").value =
        boton.dataset.nombre;

    document.getElementById("apellido").value =
        boton.dataset.apellido;

    document.getElementById("fechaNacimiento").value =
        boton.dataset.fecha;

    document.getElementById("nivel").value =
        boton.dataset.nivel.toUpperCase();

    document.getElementById("idApoderado").value =
        boton.dataset.apoderado;

    document.getElementById("modalAlumno").style.display = "flex";

});

//=========================================
// ELIMINAR ALUMNO
//=========================================

document.addEventListener("click", async function(e){

    const boton = e.target.closest(".btn-delete");

    if(!boton) return;

    const id = boton.dataset.id;

    const confirmar = confirm(
        "¿Está seguro de eliminar este alumno?"
    );

    if(!confirmar) return;

    try{

        const respuesta = await fetch(`${API_ALUMNOS}/${id}`,{

            method:"DELETE"

        });

        const datos = await respuesta.json();

        if(!respuesta.ok){

            throw new Error(datos.error);

        }

        mostrarToast(datos.mensaje);

        cargarAlumnos();

    }

    catch(error){

        mostrarToast(error.message);

        mostrarToast("Debe completar todos los campos.", "warning");

    }

});

//=========================================
// BUSCADOR
//=========================================

document.addEventListener("input", function(e){

    if(e.target.id === "buscarAlumno"){

        cargarAlumnos();

    }

});

