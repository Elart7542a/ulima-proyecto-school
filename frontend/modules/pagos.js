console.log("MODULO PAGOS CARGADO");

const API_PAGOS = "http://localhost:3000/api/pagos";

let modoEdicionPago = false;
let pagoEditando = null;

//=========================================
// CARGAR PAGOS
//=========================================

async function cargarPagos(){

    try{

        const respuesta = await fetch(API_PAGOS);

        const pagos = await respuesta.json();

        const buscador = document.getElementById("buscarPago");

        let textoBuscar = "";

        if(buscador){

            textoBuscar = buscador.value.toLowerCase().trim();

        }

        const tbody = document.querySelector("#tablaPagos tbody");

        tbody.innerHTML = "";

        let filas = "";

        pagos

        .filter(pago => {

            return (

                pago.ID_RECIBO.toString().includes(textoBuscar) ||

                pago.ID_PERSONAL.toString().includes(textoBuscar) ||

                pago.ID_TIPO_COMPROBANTE.toString().includes(textoBuscar)

            );

        })

        .forEach(pago => {

            filas += `
                <tr>

                    <td>${pago.ID_RECIBO}</td>

                    <td>${formatearFechaPago(pago.FECHA_PAGO)}</td>

                    <td>${pago.ID_PERSONAL}</td>

                    <td>${pago.ID_TIPO_COMPROBANTE}</td>

                    <td>

                        <button
                            class="btn-edit-pago"
                            data-id="${pago.ID_RECIBO}"
                            data-fecha="${pago.FECHA_PAGO.substring(0,10)}"
                            data-personal="${pago.ID_PERSONAL}"
                            data-comprobante="${pago.ID_TIPO_COMPROBANTE}">

                            <i class="bi bi-pencil-fill"></i>

                        </button>

                        <button
                            class="btn-delete-pago"
                            data-id="${pago.ID_RECIBO}">

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

        mostrarToast(
            "No fue posible cargar los pagos.",
            "error"
        );

    }

}

function formatearFechaPago(fecha){

    const fechaPago = new Date(fecha);

    return fechaPago.toLocaleDateString("es-PE");

}

function iniciarModuloPagos(){

    cargarPagos();

}

function limpiarFormularioPago(){

    modoEdicionPago = false;
    pagoEditando = null;

    document.getElementById("formPago").reset();

    document.getElementById("idRecibo").disabled = false;

    document.getElementById("tituloModalPago").textContent =
        "Registrar Pago";

}

//=========================================
// REGISTRAR / ACTUALIZAR
//=========================================

document.addEventListener("submit", async function(e){

    if(e.target.id !== "formPago") return;

    e.preventDefault();

    const pago = {

        id_recibo:
            Number(document.getElementById("idRecibo").value),

        fecha_pago:
            document.getElementById("fechaPago").value,

        id_personal:
            Number(document.getElementById("idPersonalPago").value),

        id_tipo_comprobante:
            Number(document.getElementById("idTipoComprobante").value)

    };

    try{

        const url = modoEdicionPago
            ? `${API_PAGOS}/${pagoEditando}`
            : API_PAGOS;

        const metodo = modoEdicionPago
            ? "PUT"
            : "POST";

        const respuesta = await fetch(url, {

            method: metodo,

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify(pago)

        });

        const datos = await respuesta.json();

        if(!respuesta.ok){

            throw new Error(datos.error);

        }

        mostrarToast(datos.mensaje, "success");

        document.getElementById("modalPago").style.display = "none";

        limpiarFormularioPago();

        cargarPagos();

    }

    catch(error){

        mostrarToast(error.message, "error");

    }

});

//=========================================
// EDITAR
//=========================================

document.addEventListener("click", function(e){

    const boton = e.target.closest(".btn-edit-pago");

    if(!boton) return;

    modoEdicionPago = true;

    pagoEditando = boton.dataset.id;

    document.getElementById("tituloModalPago").textContent =
        "Editar Pago";

    document.getElementById("idRecibo").value =
        boton.dataset.id;

    document.getElementById("idRecibo").disabled = true;

    document.getElementById("fechaPago").value =
        boton.dataset.fecha;

    document.getElementById("idPersonalPago").value =
        boton.dataset.personal;

    document.getElementById("idTipoComprobante").value =
        boton.dataset.comprobante;

    document.getElementById("modalPago").style.display = "flex";

});

//=========================================
// ELIMINAR
//=========================================

document.addEventListener("click", async function(e){

    const boton = e.target.closest(".btn-delete-pago");

    if(!boton) return;

    const id = boton.dataset.id;

    const confirmar = confirm(
        "¿Está seguro de eliminar este pago?"
    );

    if(!confirmar) return;

    try{

        const respuesta = await fetch(`${API_PAGOS}/${id}`, {

            method: "DELETE"

        });

        const datos = await respuesta.json();

        if(!respuesta.ok){

            throw new Error(datos.error);

        }

        mostrarToast(datos.mensaje, "success");

        cargarPagos();

    }

    catch(error){

        mostrarToast(error.message, "error");

    }

});

//=========================================
// BUSCADOR
//=========================================

document.addEventListener("input", function(e){

    if(e.target.id === "buscarPago"){

        cargarPagos();

    }

});