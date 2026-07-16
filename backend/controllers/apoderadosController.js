const oracledb = require("oracledb");
const { getConnection } = require("../config/oracle");

//=========================================
// OBTENER APODERADOS
//=========================================

async function obtenerApoderados(req, res) {

    let connection;

    try {

        connection = await getConnection();

        const resultado = await connection.execute(

            `
            SELECT
                ID_APODERADO,
                NOMBRE,
                APELLIDO,
                TELEFONO,
                EMAIL
            FROM APODERADO
            ORDER BY ID_APODERADO
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

            error:"Error obteniendo apoderados"

        });

    }

    finally{

        if(connection){

            await connection.close();

        }

    }

}

async function registrarApoderado(req,res){

    let connection;

    try{

        connection = await getConnection();

        const {id_apoderado,nombre,apellido,telefono,email}=req.body;

        await connection.execute(

            `BEGIN
                sp_registrar_apoderado(
                    :id_apoderado,
                    :nombre,
                    :apellido,
                    :telefono,
                    :email
                );
            END;`,

            {
                id_apoderado,
                nombre,
                apellido,
                telefono,
                email
            },

            {autoCommit:true}

        );

        res.json({mensaje:"Apoderado registrado correctamente."});

    }catch(error){

        res.status(400).json({error:error.message});

    }finally{

        if(connection) await connection.close();

    }

}

async function actualizarApoderado(req,res){

    let connection;

    try{

        connection = await getConnection();

        const id_apoderado = Number(req.params.id);

        const {nombre,apellido,telefono,email}=req.body;

        await connection.execute(

            `BEGIN
                sp_actualizar_apoderado(
                    :id_apoderado,
                    :nombre,
                    :apellido,
                    :telefono,
                    :email
                );
            END;`,

            {
                id_apoderado,
                nombre,
                apellido,
                telefono,
                email
            },

            {autoCommit:true}

        );

        res.json({mensaje:"Apoderado actualizado correctamente."});

    }catch(error){

        res.status(400).json({error:error.message});

    }finally{

        if(connection) await connection.close();

    }

}

async function eliminarApoderado(req,res){

    let connection;

    try{

        connection = await getConnection();

        await connection.execute(

            `BEGIN
                sp_eliminar_apoderado(:id);
            END;`,

            {
                id:Number(req.params.id)
            },

            {autoCommit:true}

        );

        res.json({mensaje:"Apoderado eliminado correctamente."});

    }catch(error){

        res.status(400).json({error:error.message});

    }finally{

        if(connection) await connection.close();

    }

}

module.exports = {

    obtenerApoderados,
    registrarApoderado,
    actualizarApoderado,
    eliminarApoderado

};