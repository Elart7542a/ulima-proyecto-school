const express = require("express");

const router = express.Router();

const alumnosController = require("../controllers/alumnosController");

router.get("/", alumnosController.obtenerAlumnos);

router.post("/", alumnosController.registrarAlumno);

router.put("/:id", alumnosController.actualizarAlumno);

router.delete("/:id", alumnosController.eliminarAlumno);

module.exports = router;