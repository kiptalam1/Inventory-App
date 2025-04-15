const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
	res.render("home");
});

router.get("/suspension", (req, res) => {
	res.render("suspension");
});
router.get("/electrical-systems", (req, res) => {
	res.render("systems");
});
router.get("/brakes", (req, res) => {
	res.render("brakes");
});
router.get("/interior", (req, res) => {
	res.render("interior");
});
router.get("/engine", (req, res) => {
	res.render("engine");
});

module.exports = router;
