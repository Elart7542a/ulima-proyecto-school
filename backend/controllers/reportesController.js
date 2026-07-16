const oracledb = require("oracledb");
const { getConnection } = require("../config/oracle");

//=========================================
// REPORTE DE ALUMNOS MATRICULADOS
//=========================================

async function obtenerAlumnosMatriculados(req, res){

    let connection;

    try{

        connection = await getConnection();

        const resultado = await connection.execute(

            `
            SELECT

                m.id_matricula AS ID_MATRICULA,

                a.nombre || ' ' || a.apellido AS ALUMNO,

                s.nombre_salon AS SALON,

                ae.anio AS ANIO_ESCOLAR,

                m.fecha_matricula AS FECHA_MATRICULA

            FROM matricula m

            INNER JOIN alumno a
                ON a.id_alumno = m.id_alumno

            INNER JOIN salon s
                ON s.id_salon = m.id_salon

            INNER JOIN anio_escolar ae
                ON ae.id_anio_escolar = m.id_anio_escolar

            ORDER BY m.id_matricula
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

            error:
                "No fue posible obtener el reporte de alumnos matriculados."

        });

    }

    finally{

        if(connection){

            await connection.close();

        }

    }

}

//=========================================
// REPORTE DE PAGOS
//=========================================

async function obtenerReportePagos(req, res){

    let connection;

    try{

        connection = await getConnection();

        const resultado = await connection.execute(

            `
            SELECT

                rp.id_recibo AS ID_RECIBO,

                rp.fecha_pago AS FECHA_PAGO,

                p.nombre || ' ' || p.apellido AS PERSONAL,

                tc.descripcion_comprobante AS COMPROBANTE,

                fn_total_recibo(rp.id_recibo) AS TOTAL

            FROM recibo_pago rp

            INNER JOIN personal p
                ON p.id_personal = rp.id_personal

            INNER JOIN tipo_comprobante tc
                ON tc.id_tipo_comprobante =
                   rp.id_tipo_comprobante

            ORDER BY rp.id_recibo
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

            error:
                "No fue posible obtener el reporte de pagos."

        });

    }

    finally{

        if(connection){

            await connection.close();

        }

    }

}


//=========================================
// REPORTE DE PERSONAL
//=========================================

async function obtenerReportePersonal(req, res){

    let connection;

    try{

        connection = await getConnection();

        const resultado = await connection.execute(

            `
            SELECT
                p.id_personal AS ID_PERSONAL,
                fn_info_personal(p.id_personal) AS INFO_PERSONAL,
                p.dni AS DNI,
                p.telefono AS TELEFONO,
                s.nombre_salon AS SALON
            FROM personal p
            INNER JOIN salon s
                ON s.id_salon = p.id_salon
            ORDER BY p.id_personal
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

            error:
                "No fue posible obtener el reporte de personal."

        });

    }

    finally{

        if(connection){

            await connection.close();

        }

    }

}

//=========================================
// REPORTE DE ESTADÍSTICAS
//=========================================

async function obtenerEstadisticas(req, res){

    let connection;

    try{

        connection = await getConnection();

        const resultado = await connection.execute(

            `
            SELECT

                (SELECT COUNT(*) FROM alumno)
                    AS TOTAL_ALUMNOS,

                (SELECT COUNT(*) FROM apoderado)
                    AS TOTAL_APODERADOS,

                (SELECT COUNT(*) FROM matricula)
                    AS TOTAL_MATRICULAS,

                (SELECT COUNT(*) FROM personal)
                    AS TOTAL_PERSONAL,

                (SELECT COUNT(*) FROM recibo_pago)
                    AS TOTAL_PAGOS

            FROM dual
            `,

            [],

            {
                outFormat: oracledb.OUT_FORMAT_OBJECT
            }

        );

        res.json(resultado.rows[0]);

    }

    catch(error){

        console.error(error);

        res.status(500).json({

            error:
                "No fue posible obtener las estadísticas."

        });

    }

    finally{

        if(connection){

            await connection.close();

        }

    }

}

//=========================================
// REPORTE DE ALUMNOS POR SALÓN
//=========================================

async function obtenerAlumnosPorSalon(req, res){

    let connection;

    try{

        connection = await getConnection();

        const resultado = await connection.execute(

            `
            SELECT
                s.id_salon AS ID_SALON,
                s.nombre_salon AS SALON,
                s.nivel_educativo AS NIVEL,
                fn_total_alumnos_salon(s.id_salon) AS TOTAL_ALUMNOS
            FROM salon s
            ORDER BY s.id_salon
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

            error:
                "No fue posible obtener el reporte de alumnos por salón."

        });

    }

    finally{

        if(connection){

            await connection.close();

        }

    }

}

module.exports = {

    obtenerAlumnosMatriculados,
    obtenerReportePagos,
    obtenerReportePersonal,
    obtenerEstadisticas,
    obtenerAlumnosPorSalon

};