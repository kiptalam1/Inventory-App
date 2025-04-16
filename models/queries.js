const pool = require("./pool");

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
};
