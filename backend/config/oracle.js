const oracledb = require("oracledb");
require("dotenv").config();

const dbConfig = {
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    connectString: process.env.DB_CONNECT_STRING
};

async function getConnection() {

    let connection;

    try {

        connection = await oracledb.getConnection(dbConfig);

        console.log("✅ Conexión a Oracle establecida.");

        return connection;

    } catch (error) {

        console.error("❌ Error al conectar con Oracle.");

        console.error(error);

        throw error;

    }

}

module.exports = {
    getConnection
};