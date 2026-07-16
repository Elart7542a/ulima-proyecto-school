const express = require("express");

const router = express.Router();

const reportesController =
    require("../controllers/reportesController");

router.get(
    "/matriculas",
    reportesController.obtenerAlumnosMatriculados
);

router.get(
    "/pagos",
    reportesController.obtenerReportePagos
);

router.get(
    "/personal",
    reportesController.obtenerReportePersonal
);

router.get(
    "/estadisticas",
    reportesController.obtenerEstadisticas
);

router.get(
    "/salones",
    reportesController.obtenerAlumnosPorSalon
);

module.exports = router;