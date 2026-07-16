const oracledb = require("oracledb");
const { getConnection } = require("../config/oracle");

//=========================================
// OBTENER MATRÍCULAS
//=========================================

async function obtenerMatriculas(req,res){

    let connection;

    try{

        connection = await getConnection();

        const resultado = await connection.execute(

            `
            SELECT

                ID_MATRICULA,
                ID_ALUMNO,
                ID_SALON,
                ID_ANIO_ESCOLAR,
                FECHA_MATRICULA

            FROM MATRICULA

            ORDER BY ID_MATRICULA
            `,

            [],

            {

                outFormat:oracledb.OUT_FORMAT_OBJECT

            }

        );

        res.json(resultado.rows);

    }

    catch(error){

        console.error(error);

        res.status(500).json({

            error:"Error obteniendo matrículas"

        });

    }

    finally{

        if(connection){

            await connection.close();

        }

    }

}

//=========================================
// REGISTRAR MATRÍCULA
//=========================================

async function registrarMatricula(req,res){

    let connection;

    try{

        connection = await getConnection();

        const{

            id_matricula,
            id_alumno,
            id_salon,
            id_anio_escolar,
            fecha_matricula

        } = req.body;

        await connection.execute(

            `
            BEGIN

                sp_registrar_matricula(

                    :id_matricula,
                    :id_alumno,
                    :id_salon,
                    :id_anio_escolar,
                    TO_DATE(:fecha_matricula,'YYYY-MM-DD')

                );

            END;
            `,

            {

                id_matricula,
                id_alumno,
                id_salon,
                id_anio_escolar,
                fecha_matricula

            },

            {

                autoCommit:true

            }

        );

        res.json({

            mensaje:"Matrícula registrada correctamente."

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
// ACTUALIZAR MATRÍCULA
//=========================================

async function actualizarMatricula(req,res){

    let connection;

    try{

        connection = await getConnection();

        const id_matricula = Number(req.params.id);

        const{

            id_alumno,
            id_salon,
            id_anio_escolar,
            fecha_matricula

        } = req.body;

        await connection.execute(

            `
            BEGIN

                sp_actualizar_matricula(

                    :id_matricula,
                    :id_alumno,
                    :id_salon,
                    :id_anio_escolar,
                    TO_DATE(:fecha_matricula,'YYYY-MM-DD')

                );

            END;
            `,

            {

                id_matricula,
                id_alumno,
                id_salon,
                id_anio_escolar,
                fecha_matricula

            },

            {

                autoCommit:true

            }

        );

        res.json({

            mensaje:"Matrícula actualizada correctamente."

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
// ELIMINAR MATRÍCULA
//=========================================

async function eliminarMatricula(req,res){

    let connection;

    try{

        connection = await getConnection();

        await connection.execute(

            `
            BEGIN

                sp_eliminar_matricula(:id);

            END;
            `,

            {

                id:Number(req.params.id)

            },

            {

                autoCommit:true

            }

        );

        res.json({

            mensaje:"Matrícula eliminada correctamente."

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

module.exports={

    obtenerMatriculas,
    registrarMatricula,
    actualizarMatricula,
    eliminarMatricula

};