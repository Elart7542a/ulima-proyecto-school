const oracledb = require("oracledb");
const { getConnection } = require("../config/oracle");
const { actualizarAlumno } = require("./alumnosController");

//=========================================
// OBTENER PAGOS
//=========================================

async function obtenerPagos(req, res){

    let connection;

    try{

        connection = await getConnection();

        const resultado = await connection.execute(

            `
            SELECT
                ID_RECIBO,
                FECHA_PAGO,
                ID_PERSONAL,
                ID_TIPO_COMPROBANTE
            FROM RECIBO_PAGO
            ORDER BY ID_RECIBO
            `,

            [],

            { outFormat: oracledb.OUT_FORMAT_OBJECT }

        );

        res.json(resultado.rows);

    }

    catch(error){

        console.error(error);

        res.status(500).json({

            error:"Error obteniendo pagos"

        });

    }

    finally{

        if(connection){

            await connection.close();

        }

    }

}

//=========================================
// REGISTRAR PAGO
//=========================================

async function registrarPago(req, res){

    let connection;

    try{

        connection = await getConnection();

        const{

            id_recibo,
            fecha_pago,
            id_personal,
            id_tipo_comprobante

        } = req.body;

        await connection.execute(

            `
            BEGIN

                sp_registrar_recibo(

                    :id_recibo,
                    TO_DATE(:fecha_pago, 'YYYY-MM-DD'),
                    :id_personal,
                    :id_tipo_comprobante

                );

            END;
            `,

            {

                id_recibo,
                fecha_pago,
                id_personal,
                id_tipo_comprobante

            },

            {

                autoCommit:true

            }

        );

        res.json({

            mensaje:"Pago registrado correctamente."

        });

    }

    catch(error){

        console.error(error);

        res.status(400).json({

            error:error.message

        });

    }

    finally{

        if(connection){

            await connection.close();

        }

    }

}

//=========================================
// ACTUALIZAR PAGO
//=========================================

async function actualizarPago(req, res){

    let connection;

    try{

        connection = await getConnection();

        const id_recibo = Number(req.params.id);

        const{

            fecha_pago,
            id_personal,
            id_tipo_comprobante

        } = req.body;

        await connection.execute(

            `
            BEGIN

                sp_actualizar_recibo(

                    :id_recibo,
                    TO_DATE(:fecha_pago, 'YYYY-MM-DD'),
                    :id_personal,
                    :id_tipo_comprobante

                );

            END;
            `,

            {

                id_recibo,
                fecha_pago,
                id_personal,
                id_tipo_comprobante

            },

            {

                autoCommit:true

            }

        );

        res.json({

            mensaje:"Pago actualizado correctamente."

        });

    }

    catch(error){

        console.error(error);

        res.status(400).json({

            error:error.message

        });

    }

    finally{

        if(connection){

            await connection.close();

        }

    }

}

//=========================================
// ELIMINAR PAGO
//=========================================

async function eliminarPago(req, res){

    let connection;

    try{

        connection = await getConnection();

        const id_recibo = Number(req.params.id);

        await connection.execute(

            `
            BEGIN

                sp_eliminar_recibo(:id_recibo);

            END;
            `,

            {

                id_recibo

            },

            {

                autoCommit:true

            }

        );

        res.json({

            mensaje:"Pago eliminado correctamente."

        });

    }

    catch(error){

        console.error(error);

        res.status(400).json({

            error:error.message

        });

    }

    finally{

        if(connection){

            await connection.close();

        }

    }

}

module.exports = {

    obtenerPagos,
    registrarPago,
    actualizarPago,
    eliminarPago

};