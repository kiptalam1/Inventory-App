const db = require("../models/queries");

async function getParts(req, res) {
	const parts = await db.getAllParts();
	// console.log("all parts", parts);
	res.render("parts", { title: " Parts", parts });
}

async function getLogs(req, res) {
	const logs = await db.getInventoryLogs();
	// console.log("inventory logs", logs);
	res.render("logs", { title: " Inventory Logs", logs });
}

async function getBrakeParts(req, res) {
	const brakeParts = await db.getAllBrakeParts();
	// console.log("brake parts", brakeParts);
	res.render("brakes", { title: "Brake Parts", brakeParts });
}

async function getEngineParts(req, res) {
	const engineParts = await db.getAllEngineParts();
	// console.log("engine parts", engineParts);
	res.render("engine", { title: "Engine Parts", engineParts });
}

async function getElectricalParts(req, res) {
	const electricalParts = await db.getAllElectricalParts();
	// console.log("electrical parts", electricalParts);
	res.render("electrical", { title: "Electrical Parts", electricalParts });
}

async function getAccessories(req, res) {
	const interiorAccessories = await db.getAllAccessories();
	// console.log("interior Accessories", interiorAccessories);
	res.render("interior", {
		title: "interior Accessories",
		interiorAccessories,
	});
}

async function getSuspensionParts(req, res) {
	const suspensions = await db.getAllSuspensionParts();
	// console.log("suspensions parts", suspensions);
	res.render("suspension", { title: "Suspension Parts", suspensions });
}

async function getDashboardData(req, res) {
	try {
		const [totalParts, totalCarModels, totalSuppliers, totalStock] =
			await Promise.all([
				db.getTotalPartsCount(),
				db.getTotalCarModels(),
				db.getTotalSuppliers(),
				db.getTotalStock(),
			]);

		res.render("home", {
			totalParts,
			totalCarModels,
			totalSuppliers,
			totalStock,
		});
	} catch (err) {
		console.error("Dashboard error:", err);
		res.status(500).send("Internal Server Error");
	}
}

async function renderAddPartForm(req, res) {
	res.render("addPart"); // View should be addPart.ejs
}

async function addPart(req, res) {
	try {
		await db.addPartToDB(req.body);
		res.redirect("/parts");
	} catch (err) {
		console.error("Failed to insert part:", err);
		res.status(500).send("Error inserting part.");
	}
}

async function getAllCarModels(req, res) {
	const cars = await db.getCarModels();
	// console.log("cars", cars);
	res.render("carModels", { title: "Car Models", cars });
}

module.exports = {
	getBrakeParts,
	getAccessories,
	getElectricalParts,
	getEngineParts,
	getSuspensionParts,
	getDashboardData,
	getParts,
	getLogs,
	addPart,
	renderAddPartForm,
	getAllCarModels,
};
