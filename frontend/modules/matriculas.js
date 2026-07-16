console.log("MODULO MATRICULAS CARGADO");

const API_MATRICULAS = "http://localhost:3000/api/matriculas";

let modoEdicionMatricula = false;
let matriculaEditando = null;

async function cargarMatriculas() {

    try {

        const respuesta = await fetch(API_MATRICULAS);

        const matriculas = await respuesta.json();

        let textoBuscar = "";

        const buscador = document.getElementById("buscarMatricula");

        if(buscador){

            textoBuscar = buscador.value.toLowerCase().trim();

        }

        const tbody = document.querySelector("#tablaMatriculas tbody");

        tbody.innerHTML = "";

        let filas = "";

        matriculas

        .filter(matricula => {

            return (

                matricula.ID_MATRICULA.toString().includes(textoBuscar) ||

                matricula.ID_ALUMNO.toString().includes(textoBuscar) ||

                matricula.ID_SALON.toString().includes(textoBuscar) ||

                matricula.ID_ANIO_ESCOLAR.toString().includes(textoBuscar)

            );

        })

        .forEach(matricula => {

            filas += `
                <tr>

                    <td>${matricula.ID_MATRICULA}</td>

                    <td>${matricula.ID_ALUMNO}</td>

                    <td>${matricula.ID_SALON}</td>

                    <td>${matricula.ID_ANIO_ESCOLAR}</td>

                    <td>${formatearFecha(matricula.FECHA_MATRICULA)}</td>

                    <td>

                        <button
                            class="btn-edit-matricula"
                            data-id="${matricula.ID_MATRICULA}"
                            data-alumno="${matricula.ID_ALUMNO}"
                            data-salon="${matricula.ID_SALON}"
                            data-anio="${matricula.ID_ANIO_ESCOLAR}"
                            data-fecha="${matricula.FECHA_MATRICULA.substring(0,10)}">

                            <i class="bi bi-pencil-fill"></i>

                        </button>

                        <button
                            class="btn-delete-matricula"
                            data-id="${matricula.ID_MATRICULA}">

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

        alert("No fue posible cargar las matrículas.");

    }

}

function formatearFecha(fecha){

    const f = new Date(fecha);

    return f.toLocaleDateString("es-PE");

}

function iniciarModuloMatriculas(){

    cargarMatriculas();

}

function limpiarFormularioMatricula(){

    modoEdicionMatricula = false;

    matriculaEditando = null;

    document.getElementById("formMatricula").reset();

    document.getElementById("idMatricula").disabled = false;

    document.getElementById("tituloModalMatricula").textContent =
        "Registrar Matrícula";

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

//=========================================
// REGISTRAR MATRÍCULA
//=========================================

document.addEventListener("submit", async function(e){

    if(e.target.id !== "formMatricula") return;

    e.preventDefault();

    const matricula = {

        id_matricula: Number(document.getElementById("idMatricula").value),

        id_alumno: Number(document.getElementById("idAlumno").value),

        id_salon: Number(document.getElementById("idSalon").value),

        id_anio_escolar: Number(document.getElementById("idAnioEscolar").value),

        fecha_matricula: document.getElementById("fechaMatricula").value

    };

    try{

        const url = modoEdicionMatricula
            ? `${API_MATRICULAS}/${matriculaEditando}`
            : API_MATRICULAS;

        const metodo = modoEdicionMatricula
            ? "PUT"
            : "POST";

        const respuesta = await fetch(url,{

            method: metodo,

            headers:{
                "Content-Type":"application/json"
            },

            body: JSON.stringify(matricula)

        });

        const datos = await respuesta.json();

        if(!respuesta.ok){

            throw new Error(datos.error);

        }

        mostrarToast(datos.mensaje, "success");

        document.getElementById("modalMatricula").style.display = "none";

        document.getElementById("formMatricula").reset();

        modoEdicionMatricula = false;

        matriculaEditando = null;

        document.getElementById("tituloModalMatricula").textContent =
            "Registrar Matrícula";

        cargarMatriculas();

    }

    catch(error){

        mostrarToast(error.message, "error");

    }

});

//=========================================
// EDITAR MATRÍCULA
//=========================================

document.addEventListener("click", function(e){

    const boton = e.target.closest(".btn-edit-matricula");

    if(!boton) return;

    modoEdicionMatricula = true;

    matriculaEditando = boton.dataset.id;

    document.getElementById("tituloModalMatricula").textContent =
        "Editar Matrícula";

    document.getElementById("idMatricula").value =
        boton.dataset.id;

    document.getElementById("idMatricula").disabled = true;

    document.getElementById("idAlumno").value =
        boton.dataset.alumno;

    document.getElementById("idSalon").value =
        boton.dataset.salon;

    document.getElementById("idAnioEscolar").value =
        boton.dataset.anio;

    document.getElementById("fechaMatricula").value =
        boton.dataset.fecha;

    document.getElementById("modalMatricula").style.display =
        "flex";

});

//=========================================
// ELIMINAR MATRÍCULA
//=========================================

document.addEventListener("click", async function(e){

    const boton = e.target.closest(".btn-delete-matricula");

    if(!boton) return;

    const id = boton.dataset.id;

    const confirmar = confirm(
        "¿Está seguro de eliminar esta matrícula?"
    );

    if(!confirmar) return;

    try{

        const respuesta = await fetch(`${API_MATRICULAS}/${id}`,{

            method:"DELETE"

        });

        const datos = await respuesta.json();

        if(!respuesta.ok){

            throw new Error(datos.error);

        }

        mostrarToast(datos.mensaje, "success");

        cargarMatriculas();

    }

    catch(error){

        mostrarToast(error.message, "error");

    }

});

document.addEventListener("input", function(e){

    if(e.target.id === "buscarMatricula"){

        cargarMatriculas();

    }

});