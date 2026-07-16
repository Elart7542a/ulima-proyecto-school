const contenido = document.getElementById("contenido");

async function cargarPagina(pagina) {

    const respuesta = await fetch(`pages/${pagina}.html`);

    const html = await respuesta.text();

    contenido.innerHTML = html;

    if(pagina==="reportes"){

        iniciarModuloReportes();

    }

    if (pagina === "dashboard") {

        iniciarModuloDashboard();

    }

    if (pagina === "alumnos") {

        iniciarModuloAlumnos();

    }

    if (pagina === "apoderados") {

        iniciarModuloApoderados();

    }

    if (pagina === "matriculas") {

        iniciarModuloMatriculas();

    }

    if (pagina === "personal") {

        iniciarModuloPersonal();

    }

    if (pagina === "pagos") {

        iniciarModuloPagos();

    }
}

cargarPagina("dashboard");

document.querySelectorAll("nav li").forEach(item => {

    item.addEventListener("click", () => {

        document.querySelectorAll("nav li").forEach(x => {
            x.classList.remove("active");
        });

        item.classList.add("active");

        cargarPagina(item.dataset.page);

    });

});

//=========================================
// EVENTOS DE LOS MODALES
//=========================================

document.addEventListener("click", function(e){

    //=====================================
    // ALUMNOS
    //=====================================

    if(e.target.closest("#btnNuevoAlumno")){

        limpiarFormulario();

        document.getElementById("modalAlumno").style.display = "flex";

    }

    if(e.target.closest("#modalAlumno #cerrarModal")){

        limpiarFormulario();

        document.getElementById("modalAlumno").style.display = "none";

    }

    if(e.target.closest("#modalAlumno #btnCancelar")){

        limpiarFormulario();

        document.getElementById("modalAlumno").style.display = "none";

    }

    //=====================================
    // APODERADOS
    //=====================================

    if(e.target.closest("#btnNuevoApoderado")){

        limpiarFormularioApoderado();

        document.getElementById("modalApoderado").style.display = "flex";

    }

    if(e.target.closest("#modalApoderado #cerrarModal")){

        limpiarFormularioApoderado();

        document.getElementById("modalApoderado").style.display = "none";

    }

    if(e.target.closest("#modalApoderado #btnCancelar")){

        limpiarFormularioApoderado();

        document.getElementById("modalApoderado").style.display = "none";

    }

    // Abrir modal Matrícula
    if(e.target.closest("#btnNuevaMatricula")){

        limpiarFormularioMatricula();

        document.getElementById("modalMatricula").style.display = "flex";

    }

    // Cerrar con X
    if(e.target.closest("#cerrarModalMatricula")){

        limpiarFormularioMatricula();

        document.getElementById("modalMatricula").style.display = "none";

    }

    // Cerrar con Cancelar
    if(e.target.closest("#btnCancelarMatricula")){

        limpiarFormularioMatricula();

        document.getElementById("modalMatricula").style.display = "none";

    }

    //=====================================
    // PERSONAL
    //=====================================

    // Abrir modal
    if(e.target.closest("#btnNuevoPersonal")){

        limpiarFormularioPersonal();

        document.getElementById("modalPersonal").style.display = "flex";

    }

    // Cerrar con X
    if(e.target.closest("#modalPersonal #cerrarModal")){

        limpiarFormularioPersonal();

        document.getElementById("modalPersonal").style.display = "none";

    }

    // Cerrar con Cancelar
    if(e.target.closest("#modalPersonal #btnCancelar")){

        limpiarFormularioPersonal();

        document.getElementById("modalPersonal").style.display = "none";

    }

    //=====================================
    // PAGOS
    //=====================================

    if(e.target.closest("#btnNuevoPago")){

        limpiarFormularioPago();

        document.getElementById("modalPago").style.display = "flex";

    }

    if(e.target.closest("#cerrarModalPago")){

        limpiarFormularioPago();

        document.getElementById("modalPago").style.display = "none";

    }

    if(e.target.closest("#btnCancelarPago")){

        limpiarFormularioPago();

        document.getElementById("modalPago").style.display = "none";

    }

});

