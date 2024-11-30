const express = require("express");
const router = express.Router();
const CenterController = require("../controllers/centers.controller");

router.get("/", CenterController.getAllCenters);
router.get("/:id", CenterController.getCenterById);
router.post("/", CenterController.createCenter);
router.put("/:id", CenterController.updateCenter);
router.delete("/:id", CenterController.deleteCenter);

// Ruta para obtener mascotas asociadas a un centro
router.get("/:id/pets", CenterController.getPetsByCenter);

module.exports = router;
