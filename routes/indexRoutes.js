const express = require("express");
const indexController = require("../controllers/indexController");
const router = express.Router();

router.get("/", indexController.getDashboardData);

router.get("/brakes", indexController.getBrakeParts);

router.get("/suspension", indexController.getSuspensionParts);
router.get("/electrical", indexController.getElectricalParts);

router.get("/interior", indexController.getAccessories);
router.get("/engine", indexController.getEngineParts);
router.get("/parts", indexController.getParts);
router.get("/logs", indexController.getLogs);
router.get("/carModels", indexController.getAllCarModels);
router.get("/addPart", indexController.renderAddPartForm);
router.post("/addPart", indexController.addPart);

module.exports = router;
