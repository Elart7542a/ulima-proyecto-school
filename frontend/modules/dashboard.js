console.log("MODULO DASHBOARD CARGADO");

const API_DASHBOARD = "http://localhost:3000/api/dashboard";

async function cargarDashboard(){

    try{

        const respuesta = await fetch(API_DASHBOARD);

        const datos = await respuesta.json();

        if(!respuesta.ok){

            throw new Error(datos.error);

        }

        document.getElementById("totalAlumnos").textContent =
            datos.total_alumnos;

        document.getElementById("totalApoderados").textContent =
            datos.total_apoderados;

        document.getElementById("totalMatriculas").textContent =
            datos.total_matriculas;

        document.getElementById("totalPagos").textContent =
            datos.total_pagos;

        document.getElementById("resumenAlumnos").textContent =
            datos.total_alumnos;

        document.getElementById("resumenApoderados").textContent =
            datos.total_apoderados;

        document.getElementById("resumenMatriculas").textContent =
            datos.total_matriculas;

        document.getElementById("resumenPersonal").textContent =
            datos.total_personal;

        document.getElementById("resumenPagos").textContent =
            datos.total_pagos;

    }

    catch(error){

        console.error(error);

        mostrarToast(
            "No fue posible cargar el dashboard.",
            "error"
        );

    }

}

function iniciarModuloDashboard(){

    cargarDashboard();

}