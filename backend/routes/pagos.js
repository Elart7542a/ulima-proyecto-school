const express = require("express");

const router = express.Router();

const pagosController = require("../controllers/pagosController");

router.get("/", pagosController.obtenerPagos);

router.post("/", pagosController.registrarPago);

router.put("/:id", pagosController.actualizarPago);

router.delete("/:id", pagosController.eliminarPago);

module.exports = router;