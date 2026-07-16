const express = require("express");

const router = express.Router();

const matriculasController =
require("../controllers/matriculasController");

router.get("/", matriculasController.obtenerMatriculas);

router.post("/", matriculasController.registrarMatricula);

router.put("/:id", matriculasController.actualizarMatricula);

router.delete("/:id", matriculasController.eliminarMatricula);

module.exports = router;