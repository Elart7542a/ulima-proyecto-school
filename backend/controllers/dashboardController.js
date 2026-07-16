const { getConnection } = require("../config/oracle");

//=========================================
// OBTENER RESUMEN DEL DASHBOARD
//=========================================

async function obtenerResumen(req, res){

    let connection;

    try{

        connection = await getConnection();

        const resultado = await connection.execute(

            `
            SELECT

                (SELECT COUNT(*) FROM ALUMNO)
                    AS TOTAL_ALUMNOS,

                (SELECT COUNT(*) FROM APODERADO)
                    AS TOTAL_APODERADOS,

                (SELECT COUNT(*) FROM MATRICULA)
                    AS TOTAL_MATRICULAS,

                (SELECT COUNT(*) FROM PERSONAL)
                    AS TOTAL_PERSONAL,

                (SELECT COUNT(*) FROM RECIBO_PAGO)
                    AS TOTAL_PAGOS

            FROM DUAL
            `

        );

        const fila = resultado.rows[0];

        res.json({

            total_alumnos: fila[0],
            total_apoderados: fila[1],
            total_matriculas: fila[2],
            total_personal: fila[3],
            total_pagos: fila[4]

        });

    }

    catch(error){

        console.error(error);

        res.status(500).json({

            error:"No fue posible obtener el resumen del dashboard."

        });

    }

    finally{

        if(connection){

            await connection.close();

        }

    }

}

module.exports = {

    obtenerResumen

};