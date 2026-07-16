console.log("MODULO REPORTES CARGADO");

let reporteActivo = "matriculas";

let API_REPORTES =
    "http://localhost:3000/api/reportes/matriculas";

//=========================================
// OBTENER TEXTO DEL BUSCADOR
//=========================================

function obtenerTextoBusqueda(){

    const buscador =
        document.getElementById("buscarReporte");

    if(!buscador){

        return "";

    }

    return buscador.value
        .toLowerCase()
        .trim();

}

//=========================================
// CARGAR REPORTE DE MATRÍCULAS
//=========================================

async function cargarReporteMatriculas(){

    try{

        const respuesta = await fetch(
            "http://localhost:3000/api/reportes/matriculas"
        );

        const datos = await respuesta.json();

        if(!respuesta.ok){

            throw new Error(
                datos.error ||
                "No fue posible cargar el reporte de matrículas."
            );

        }

        const textoBuscar = obtenerTextoBusqueda();

        const tbody =
            document.getElementById("cuerpoReporte");

        let filas = "";

        datos

        .filter(item => {

            return (

                item.ID_MATRICULA
                    .toString()
                    .includes(textoBuscar)

                ||

                item.ALUMNO
                    .toLowerCase()
                    .includes(textoBuscar)

                ||

                item.SALON
                    .toLowerCase()
                    .includes(textoBuscar)

                ||

                item.ANIO_ESCOLAR
                    .toString()
                    .includes(textoBuscar)

            );

        })

        .forEach(item => {

            filas += `

                <tr>

                    <td>${item.ID_MATRICULA}</td>

                    <td>${item.ALUMNO}</td>

                    <td>${item.SALON}</td>

                    <td>${item.ANIO_ESCOLAR}</td>

                    <td>
                        ${formatearFecha(item.FECHA_MATRICULA)}
                    </td>

                </tr>

            `;

        });

        if(filas === ""){

            filas = `

                <tr>

                    <td
                        colspan="5"
                        style="text-align:center">

                        No se encontraron registros.

                    </td>

                </tr>

            `;

        }

        tbody.innerHTML = filas;

    }

    catch(error){

        console.error(error);

        mostrarToast(error.message, "error");

    }

}

//=========================================
// CARGAR REPORTE DE PAGOS
//=========================================

async function cargarReportePagos(){

    try{

        const respuesta = await fetch(
            "http://localhost:3000/api/reportes/pagos"
        );

        const datos = await respuesta.json();

        if(!respuesta.ok){

            throw new Error(
                datos.error ||
                "No fue posible cargar el reporte de pagos."
            );

        }

        const textoBuscar = obtenerTextoBusqueda();

        const tbody =
            document.getElementById("cuerpoReporte");

        let filas = "";

        datos

        .filter(item => {

            return (

                item.ID_RECIBO
                    .toString()
                    .includes(textoBuscar)

                ||

                item.PERSONAL
                    .toLowerCase()
                    .includes(textoBuscar)

                ||

                item.COMPROBANTE
                    .toLowerCase()
                    .includes(textoBuscar)

                ||

                Number(item.TOTAL || 0)
                    .toFixed(2)
                    .includes(textoBuscar)

            );

        })

        .forEach(item => {

            filas += `

                <tr>

                    <td>${item.ID_RECIBO}</td>

                    <td>
                        ${formatearFecha(item.FECHA_PAGO)}
                    </td>

                    <td>${item.PERSONAL}</td>

                    <td>${item.COMPROBANTE}</td>

                    <td>
                        S/ ${Number(item.TOTAL || 0).toFixed(2)}
                    </td>

                </tr>

            `;

        });

        if(filas === ""){

            filas = `

                <tr>

                    <td
                        colspan="5"
                        style="text-align:center">

                        No se encontraron registros.

                    </td>

                </tr>

            `;

        }

        tbody.innerHTML = filas;

    }

    catch(error){

        console.error(error);

        mostrarToast(error.message, "error");

    }

}

//=========================================
// CARGAR REPORTE DE PERSONAL
//=========================================

async function cargarReportePersonal(){

    try{

        const respuesta = await fetch(
            "http://localhost:3000/api/reportes/personal"
        );

        const datos = await respuesta.json();

        if(!respuesta.ok){

            throw new Error(
                datos.error ||
                "No fue posible cargar el reporte de personal."
            );

        }

        const textoBuscar = obtenerTextoBusqueda();

        const tbody =
            document.getElementById("cuerpoReporte");

        let filas = "";

        datos

        .filter(item => {

            return (

                item.ID_PERSONAL
                    .toString()
                    .includes(textoBuscar)

                ||

                item.INFO_PERSONAL
                    .toLowerCase()
                    .includes(textoBuscar)

                ||

                item.DNI
                    .toString()
                    .includes(textoBuscar)

                ||

                item.TELEFONO
                    .toString()
                    .includes(textoBuscar)

                ||

                item.SALON
                    .toLowerCase()
                    .includes(textoBuscar)

            );

        })

        .forEach(item => {

            filas += `

                <tr>

                    <td>${item.ID_PERSONAL}</td>

                    <td>${item.INFO_PERSONAL}</td>

                    <td>${item.DNI}</td>

                    <td>${item.TELEFONO}</td>

                    <td>${item.SALON}</td>

                </tr>

            `;

        });

        if(filas === ""){

            filas = `

                <tr>

                    <td
                        colspan="5"
                        style="text-align:center">

                        No se encontraron registros.

                    </td>

                </tr>

            `;

        }

        tbody.innerHTML = filas;

    }

    catch(error){

        console.error(error);

        mostrarToast(error.message, "error");

    }

}

//=========================================
// CARGAR ALUMNOS POR SALÓN
//=========================================

async function cargarAlumnosPorSalon(){

    try{

        const respuesta = await fetch(
            "http://localhost:3000/api/reportes/salones"
        );

        const datos = await respuesta.json();

        if(!respuesta.ok){

            throw new Error(
                datos.error ||
                "No fue posible cargar los alumnos por salón."
            );

        }

        const textoBuscar = obtenerTextoBusqueda();

        const tbody =
            document.getElementById("cuerpoReporte");

        let filas = "";

        datos

        .filter(item => {

            return (

                item.ID_SALON
                    .toString()
                    .includes(textoBuscar)

                ||

                item.SALON
                    .toLowerCase()
                    .includes(textoBuscar)

                ||

                item.NIVEL
                    .toLowerCase()
                    .includes(textoBuscar)

                ||

                item.TOTAL_ALUMNOS
                    .toString()
                    .includes(textoBuscar)

            );

        })

        .forEach(item => {

            filas += `

                <tr>

                    <td>${item.ID_SALON}</td>

                    <td>${item.SALON}</td>

                    <td>${item.NIVEL}</td>

                    <td>${item.TOTAL_ALUMNOS}</td>

                </tr>

            `;

        });

        if(filas === ""){

            filas = `

                <tr>

                    <td
                        colspan="4"
                        style="text-align:center">

                        No se encontraron registros.

                    </td>

                </tr>

            `;

        }

        tbody.innerHTML = filas;

    }

    catch(error){

        console.error(error);

        mostrarToast(error.message, "error");

    }

}

//=========================================
// INICIAR MÓDULO
//=========================================

function iniciarModuloReportes(){

    reporteActivo = "matriculas";

    API_REPORTES =
        "http://localhost:3000/api/reportes/matriculas";

    cargarReporteMatriculas();

}

//=========================================
// CAMBIAR REPORTE
//=========================================

document.addEventListener("click", function(e){

    const tarjeta =
        e.target.closest(".reporte-card");

    if(!tarjeta) return;

    document
        .querySelectorAll(".reporte-card")
        .forEach(card => {

            card.classList.remove("active");

        });

    tarjeta.classList.add("active");

    const reporte =
        tarjeta.dataset.reporte;

    reporteActivo = reporte;

    const buscador =
        document.getElementById("buscarReporte");

    if(buscador){

        buscador.value = "";

    }

    //-------------------------------------
    // MATRÍCULAS
    //-------------------------------------

    if(reporte === "matriculas"){

        API_REPORTES =
            "http://localhost:3000/api/reportes/matriculas";

        document
            .getElementById("tituloReporte")
            .textContent =
            "Alumnos matriculados";

        document
            .getElementById("descripcionReporte")
            .textContent =
            "Relación de alumnos matriculados.";

        document
            .getElementById("encabezadoReporte")
            .innerHTML = `

                <tr>

                    <th>ID Matrícula</th>

                    <th>Alumno</th>

                    <th>Salón</th>

                    <th>Año Escolar</th>

                    <th>Fecha</th>

                </tr>

            `;

        cargarReporteMatriculas();

    }

    //-------------------------------------
    // PAGOS
    //-------------------------------------

    if(reporte === "pagos"){

        API_REPORTES =
            "http://localhost:3000/api/reportes/pagos";

        document
            .getElementById("tituloReporte")
            .textContent =
            "Pagos realizados";

        document
            .getElementById("descripcionReporte")
            .textContent =
            "Listado de todos los pagos registrados.";

        document
            .getElementById("encabezadoReporte")
            .innerHTML = `

                <tr>

                    <th>ID Recibo</th>

                    <th>Fecha</th>

                    <th>Personal</th>

                    <th>Comprobante</th>

                    <th>Total</th>

                </tr>

            `;

        cargarReportePagos();

    }

    //-------------------------------------
    // PERSONAL
    //-------------------------------------

    if(reporte === "personal"){

        API_REPORTES =
            "http://localhost:3000/api/reportes/personal";

        document
            .getElementById("tituloReporte")
            .textContent =
            "Personal registrado";

        document
            .getElementById("descripcionReporte")
            .textContent =
            "Listado del personal registrado y sus cargos.";

        document
            .getElementById("encabezadoReporte")
            .innerHTML = `

                <tr>

                    <th>ID</th>

                    <th>Personal y cargo</th>

                    <th>DNI</th>

                    <th>Teléfono</th>

                    <th>Salón</th>

                </tr>

            `;

        cargarReportePersonal();

    }

    //-------------------------------------
    // ALUMNOS POR SALÓN
    //-------------------------------------

    if(reporte === "estadisticas"){

        API_REPORTES =
            "http://localhost:3000/api/reportes/salones";

        document
            .getElementById("tituloReporte")
            .textContent =
            "Alumnos por salón";

        document
            .getElementById("descripcionReporte")
            .textContent =
            "Cantidad de alumnos matriculados en cada salón.";

        document
            .getElementById("encabezadoReporte")
            .innerHTML = `

                <tr>

                    <th>ID Salón</th>

                    <th>Salón</th>

                    <th>Nivel educativo</th>

                    <th>Total de alumnos</th>

                </tr>

            `;

        cargarAlumnosPorSalon();

    }

});

//=========================================
// BUSCADOR DEL REPORTE ACTIVO
//=========================================

document.addEventListener("input", function(e){

    if(e.target.id !== "buscarReporte") return;

    if(reporteActivo === "matriculas"){

        cargarReporteMatriculas();

    }

    if(reporteActivo === "pagos"){

        cargarReportePagos();

    }

    if(reporteActivo === "personal"){

        cargarReportePersonal();

    }

    if(reporteActivo === "estadisticas"){

        cargarAlumnosPorSalon();

    }

});

//=========================================
// IMPRIMIR
//=========================================

document.addEventListener("click", function(e){

    if(e.target.closest("#btnImprimirReporte")){

        window.print();

    }

});