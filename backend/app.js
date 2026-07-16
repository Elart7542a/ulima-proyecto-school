// ==========================================
// IMPORTACIONES
// ==========================================

const express = require("express");
const cors = require("cors");
require("dotenv").config();

const alumnosRoutes = require("./routes/alumnos");

const apoderadosRoutes =require("./routes/apoderados");

const matriculasRoutes = require("./routes/matriculas");

const personalRoutes = require("./routes/personal");

const { getConnection } = require("./config/oracle");

const pagosRoutes = require("./routes/pagos");

const dashboardRoutes = require("./routes/dashboard");

const reportesRoutes = require("./routes/reportes");

// ==========================================
// CONFIGURACIÓN
// ==========================================

const app = express();

app.use(cors());

app.use(express.json());

app.use("/api/alumnos", alumnosRoutes);

app.use("/api/apoderados", apoderadosRoutes);

app.use("/api/matriculas", matriculasRoutes);

app.use("/api/personal", personalRoutes);

app.use("/api/pagos", pagosRoutes);

app.use("/api/dashboard", dashboardRoutes);

app.use("/api/reportes", reportesRoutes);

// ==========================================
// RUTA DE PRUEBA
// ==========================================

app.get("/", (req, res) => {

    res.json({
        mensaje: "Backend del Sistema Escolar funcionando correctamente."
    });

});

// ==========================================
// PUERTO
// ==========================================

const PORT = process.env.PORT || 3000;


async function probarConexion(){

    try{

        const connection = await getConnection();

        console.log("Base de datos conectada correctamente.");

        await connection.close();

    }catch(error){

        console.log("No fue posible conectar con Oracle.");

    }

}

probarConexion();

// ==========================================
// INICIAR SERVIDOR
// ==========================================

app.listen(PORT, () => {

    console.log(`Servidor iniciado en http://localhost:${PORT}`);

});