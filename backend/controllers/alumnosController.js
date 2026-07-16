const oracledb = require("oracledb");
const { getConnection } = require("../config/oracle");

// ==========================================
// OBTENER ALUMNOS
// ==========================================

async function obtenerAlumnos(req, res) {

    let connection;

    try {

        connection = await getConnection();

        const resultado = await connection.execute(

            `
            SELECT
                a.ID_ALUMNO,
                a.NOMBRE,
                a.APELLIDO,
                fn_calcular_edad_alumno(a.id_alumno) AS EDAD,
                a.FECHA_NACIMIENTO,
                a.NIVEL,
                fn_nombre_apoderado(a.id_apoderado) AS APODERADO
            FROM ALUMNO a
            ORDER BY a.ID_ALUMNO
            `,

            [],

            {

                outFormat: oracledb.OUT_FORMAT_OBJECT

            }

        );

        res.json(resultado.rows);

    } catch (error) {

        console.error(error);

        res.status(500).json({

            error: "Error obteniendo alumnos"

        });

    } finally {

        if (connection) {

            await connection.close();

        }

    }

}

// ==========================================
// REGISTRAR ALUMNO
// ==========================================

async function registrarAlumno(req, res) {

    let connection;

    try {

        connection = await getConnection();

        const {

            id_alumno,
            nombre,
            apellido,
            fecha_nacimiento,
            nivel,
            id_apoderado

        } = req.body;

        await connection.execute(

            `
            BEGIN

                sp_registrar_alumno(

                    :id_alumno,
                    :nombre,
                    :apellido,
                    TO_DATE(:fecha_nacimiento,'YYYY-MM-DD'),
                    :nivel,
                    :id_apoderado

                );

            END;
            `,

            {

                id_alumno,
                nombre,
                apellido,
                fecha_nacimiento,
                nivel,
                id_apoderado

            },

            {

                autoCommit: true

            }

        );

        res.json({

            mensaje: "Alumno registrado correctamente."

        });

    } catch (error) {

        console.error(error);

        res.status(400).json({

            error: error.message

        });

    } finally {

        if (connection) {

            await connection.close();

        }

    }

}

// ==========================================
// ACTUALIZAR ALUMNO
// ==========================================

async function actualizarAlumno(req, res) {

    let connection;

    try {

        connection = await getConnection();

        const {

            nombre,
            apellido,
            fecha_nacimiento,
            nivel,
            id_apoderado

        } = req.body;

        const id_alumno = Number(req.params.id);

        await connection.execute(

            `
            BEGIN

                sp_actualizar_alumno(

                    :id_alumno,
                    :nombre,
                    :apellido,
                    TO_DATE(:fecha_nacimiento,'YYYY-MM-DD'),
                    :nivel,
                    :id_apoderado

                );

            END;
            `,

            {

                id_alumno,
                nombre,
                apellido,
                fecha_nacimiento,
                nivel,
                id_apoderado

            },

            {

                autoCommit:true

            }

        );

        res.json({

            mensaje:"Alumno actualizado correctamente."

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

// ==========================================
// ELIMINAR ALUMNO
// ==========================================

async function eliminarAlumno(req, res) {

    let connection;

    try {

        connection = await getConnection();

        const id_alumno = Number(req.params.id);

        await connection.execute(

            `
            BEGIN

                sp_eliminar_alumno(:id_alumno);

            END;
            `,

            {

                id_alumno

            },

            {

                autoCommit: true

            }

        );

        res.json({

            mensaje: "Alumno eliminado correctamente."

        });

    }

    catch(error){

        console.error(error);

        res.status(400).json({

            error: error.message

        });

    }

    finally{

        if(connection){

            await connection.close();

        }

    }

}

// ==========================================
// EXPORTAR FUNCIONES
// ==========================================

module.exports = {

    obtenerAlumnos,
    registrarAlumno,
    actualizarAlumno,
    eliminarAlumno

};