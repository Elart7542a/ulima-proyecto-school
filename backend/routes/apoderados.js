const express = require("express");

const router = express.Router();

const apoderadosController = require("../controllers/apoderadosController");

router.get("/", apoderadosController.obtenerApoderados);

router.post("/", apoderadosController.registrarApoderado);

router.put("/:id", apoderadosController.actualizarApoderado);

router.delete("/:id", apoderadosController.eliminarApoderado);

module.exports = router;