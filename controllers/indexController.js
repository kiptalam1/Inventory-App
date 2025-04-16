const db = require("../models/queries");

async function getBrakeParts(req, res) {
	const brakeParts = await db.getAllBrakeParts();
	console.log("brake parts", brakeParts);
	res.render("brakes", { title: "Brake Parts", brakeParts });
}

async function getEngineParts(req, res) {
	const engineParts = await db.getAllEngineParts();
	console.log("engine parts", engineParts);
	res.render("engine", { title: "Engine Parts", engineParts });
}

async function getElectricalParts(req, res) {
	const electricalParts = await db.getAllElectricalParts();
	console.log("electrical parts", electricalParts);
	res.render("electrical", { title: "Electrical Parts", electricalParts });
}

async function getAccessories(req, res) {
	const interiorAccessories = await db.getAllAccessories();
	console.log("interior Accessories", interiorAccessories);
	res.render("interior", {
		title: "interior Accessories",
		interiorAccessories,
	});
}

async function getSuspensionParts(req, res) {
	const suspensions = await db.getAllSuspensionParts();
	console.log("suspensions parts", suspensions);
	res.render("suspension", { title: "Suspension Parts", suspensions });
}

module.exports = {
	getBrakeParts,
	getAccessories,
	getElectricalParts,
	getEngineParts,
	getSuspensionParts,
};
