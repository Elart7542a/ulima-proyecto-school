const express = require("express");

const router = express.Router();

const personalController =
require("../controllers/personalController");

router.get("/", personalController.obtenerPersonal);

router.post("/", personalController.registrarPersonal);

router.put("/:id", personalController.actualizarPersonal);

router.delete("/:id", personalController.eliminarPersonal);

module.exports = router;