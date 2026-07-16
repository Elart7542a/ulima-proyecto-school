const oracledb = require("oracledb");
const { getConnection } = require("../config/oracle");

//=========================================
// OBTENER PERSONAL
//=========================================

async function obtenerPersonal(req, res){

    let connection;

    try{

        connection = await getConnection();

        const resultado = await connection.execute(

            `
            SELECT
                ID_PERSONAL,
                NOMBRE,
                APELLIDO,
                DNI,
                TELEFONO,
                ID_TIPO,
                ID_SALON
            FROM PERSONAL
            ORDER BY ID_PERSONAL
            `,

            [],

            {

                outFormat: oracledb.OUT_FORMAT_OBJECT

            }

        );

        res.json(resultado.rows);

    }

    catch(error){

        console.error(error);

        res.status(500).json({

            error:"Error obteniendo personal"

        });

    }

    finally{

        if(connection){

            await connection.close();

        }

    }

}

//=========================================
// REGISTRAR PERSONAL
//=========================================

async function registrarPersonal(req, res){

    let connection;

    try{

        connection = await getConnection();

        const {

            id_personal,
            nombre,
            apellido,
            dni,
            telefono,
            id_tipo,
            id_salon

        } = req.body;

        await connection.execute(

            `
            BEGIN

                sp_registrar_personal(

                    :id_personal,
                    :nombre,
                    :apellido,
                    :dni,
                    :telefono,
                    :id_tipo,
                    :id_salon

                );

            END;
            `,

            {

                id_personal,
                nombre,
                apellido,
                dni,
                telefono,
                id_tipo,
                id_salon

            },

            {

                autoCommit:true

            }

        );

        res.json({

            mensaje:"Personal registrado correctamente."

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
// ACTUALIZAR PERSONAL
//=========================================

async function actualizarPersonal(req, res){

    let connection;

    try{

        connection = await getConnection();

        const { id } = req.params;

        const{

            nombre,
            apellido,
            dni,
            telefono,
            id_tipo,
            id_salon

        } = req.body;

        await connection.execute(

            `
            BEGIN

                sp_actualizar_personal(

                    :id_personal,
                    :nombre,
                    :apellido,
                    :dni,
                    :telefono,
                    :id_tipo,
                    :id_salon

                );

            END;
            `,

            {

                id_personal:id,
                nombre,
                apellido,
                dni,
                telefono,
                id_tipo,
                id_salon

            },

            {

                autoCommit:true

            }

        );

        res.json({

            mensaje:"Personal actualizado correctamente."

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
// ELIMINAR PERSONAL
//=========================================

async function eliminarPersonal(req, res){

    let connection;

    try{

        connection = await getConnection();

        const { id } = req.params;

        await connection.execute(

            `
            BEGIN

                sp_eliminar_personal(

                    :id_personal

                );

            END;
            `,

            {

                id_personal:id

            },

            {

                autoCommit:true

            }

        );

        res.json({

            mensaje:"Personal eliminado correctamente."

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

    obtenerPersonal,
    registrarPersonal,
    actualizarPersonal,
    eliminarPersonal

};