const express = require("express");
const indexController = require("../controllers/indexController");
const router = express.Router();

router.get("/", (req, res) => {
	res.render("home");
});

router.get("/brakes", indexController.getBrakeParts);

router.get("/suspension", indexController.getSuspensionParts);
router.get("/electrical", indexController.getElectricalParts);

router.get("/interior", indexController.getAccessories);
router.get("/engine", indexController.getEngineParts);

module.exports = router;
