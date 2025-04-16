const pool = require("./pool");

async function addPartToDB(part) {
	const { name, description, price, stock_qty, category_id, supplier_id } =
		part;

	const query = `
    INSERT INTO parts (name, description, price, stock_qty, category_id, supplier_id)
    VALUES ($1, $2, $3, $4, $5, $6)
    RETURNING *;
`;

	const values = [
		name,
		description,
		price,
		stock_qty,
		category_id,
		supplier_id,
	];

	const result = await pool.query(query, values);
	return result.rows[0];
}

async function getInventoryLogs() {
	const { rows } = await pool.query("SELECT * FROM inventory_logs");
	return rows;
}

async function getCarModels() {
	const { rows } = await pool.query("SELECT * FROM car_models");
	return rows;
}

async function getTotalPartsCount() {
	const { rows } = await pool.query(
		"SELECT COUNT(*) AS total_parts FROM parts"
	);
	return parseInt(rows[0].total_parts, 10);
}

async function getTotalCarModels() {
	const { rows } = await pool.query(
		'SELECT COUNT(DISTINCT model) AS "uniqueModels" FROM car_models'
	);
	return parseInt(rows[0].uniqueModels, 10);
}

async function getTotalSuppliers() {
	const { rows } = await pool.query(
		"SELECT COUNT(*) AS total_suppliers FROM suppliers"
	);
	return parseInt(rows[0].total_suppliers, 10);
}

async function getTotalStock() {
	const { rows } = await pool.query(
		'SELECT SUM(stock_qty) AS "totalStock" FROM parts'
	);
	return parseInt(rows[0].totalStock, 10);
}

async function getAllParts() {
	const { rows } = await pool.query("SELECT * FROM parts");
	return rows;
}

async function getAllBrakeParts() {
	const { rows } = await pool.query(
		"SELECT * FROM parts WHERE category_id = $1",
		[2]
	);
	return rows;
}

async function getAllEngineParts() {
	const { rows } = await pool.query(
		"SELECT * FROM parts WHERE category_id = $1",
		[1]
	);
	return rows;
}

async function getAllElectricalParts() {
	const { rows } = await pool.query(
		"SELECT * FROM parts WHERE category_id = $1",
		[3]
	);
	return rows;
}

async function getAllAccessories() {
	const { rows } = await pool.query(
		"SELECT * FROM parts WHERE category_id = $1",
		[4]
	);
	return rows;
}

async function getAllSuspensionParts() {
	const { rows } = await pool.query(
		"SELECT * FROM parts WHERE category_id = $1",
		[5]
	);
	return rows;
}

module.exports = {
	getAllBrakeParts,
	getAllEngineParts,
	getAllElectricalParts,
	getAllAccessories,
	getAllSuspensionParts,
	getTotalPartsCount,
	getTotalCarModels,
	getTotalSuppliers,
	getTotalStock,
	getAllParts,
	getInventoryLogs,
	addPartToDB,
	getCarModels,
};
