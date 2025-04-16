// script
const { Client } = require("pg");
require("dotenv").config();
const useSSL = process.env.DATABASE_URL?.includes("neon.tech");

const SQL = `
CREATE TABLE IF NOT EXISTS suppliers (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    contact VARCHAR(100),
    email VARCHAR(100),
    phone VARCHAR(20)
);

INSERT INTO suppliers (name, contact, email, phone) VALUES
('AutoZone Inc.', 'Rick Sanchez', 'rick@autozone.com', '123-456-7890'),
('NAPA Auto Parts', 'Morty Smith', 'morty@napa.com', '987-654-3210'),
('OEM Distributors', 'Summer Smith', 'summer@oem.com', '555-666-7777')
ON CONFLICT DO NOTHING;

CREATE TABLE IF NOT EXISTS categories (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL
);

INSERT INTO categories (name) VALUES
('Engine'),
('Brakes'),
('Electrical'),
('Interior'),
('Suspension')
ON CONFLICT DO NOTHING;

CREATE TABLE IF NOT EXISTS car_models (
    id SERIAL PRIMARY KEY,
    make VARCHAR(100) NOT NULL,
    model VARCHAR(100) NOT NULL,
    year INT NOT NULL
);

INSERT INTO car_models (make, model, year) VALUES
('Toyota', 'Corolla', 2015),
('Honda', 'Civic', 2016),
('Ford', 'Focus', 2014),
('Toyota', 'Camry', 2018),
('Honda', 'Accord', 2016)
ON CONFLICT DO NOTHING;

CREATE TABLE IF NOT EXISTS parts (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    price NUMERIC(10,2),
    stock_qty INT,
    category_id INT REFERENCES categories(id) ON DELETE SET NULL,
    supplier_id INT REFERENCES suppliers(id) ON DELETE SET NULL
);

INSERT INTO parts (name, description, price, stock_qty, category_id, supplier_id) VALUES
('Oil Filter', 'Standard oil filter for 4-cylinder engines', 12.99, 100, 1, 1),
('Brake Pads (Front)', 'Ceramic brake pads set', 45.00, 50, 2, 2),
('Alternator 150A', 'High-output alternator', 120.00, 20, 3, 3),
('All-weather Floor Mats', 'Universal rubber mats', 35.50, 75, 4, 1),
('Shock Absorber (Rear)', 'Gas-charged rear shocks', 65.00, 30, 5, 2),
('Spark Plugs (Set of 4)', 'Copper spark plugs', 18.99, 60, 3, 3)
ON CONFLICT DO NOTHING;

CREATE TABLE IF NOT EXISTS part_compatibility (
    id SERIAL PRIMARY KEY,
    part_id INT REFERENCES parts(id) ON DELETE CASCADE,
    car_model_id INT REFERENCES car_models(id) ON DELETE CASCADE
);

INSERT INTO part_compatibility (part_id, car_model_id) VALUES
(1, 1), (1, 2),
(2, 2), (2, 3),
(3, 3), (3, 4),
(4, 1), (4, 5),
(5, 2), (5, 3),
(6, 3), (6, 4)
ON CONFLICT DO NOTHING;

CREATE TABLE IF NOT EXISTS inventory_logs (
    id SERIAL PRIMARY KEY,
    part_id INT REFERENCES parts(id) ON DELETE CASCADE,
    action VARCHAR(50),
    quantity INT,
    log_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO inventory_logs (part_id, action, quantity) VALUES
(1, 'stock_added', 100),
(2, 'stock_added', 50),
(3, 'stock_added', 20),
(4, 'stock_added', 75),
(5, 'stock_added', 30),
(6, 'stock_added', 60)
ON CONFLICT DO NOTHING;
`;

async function main() {
	console.log("Seeding...");
	console.log("🌱 Seed DB URL:", process.env.DATABASE_URL);
	const client = new Client({
		connectionString: process.env.DATABASE_URL,
		ssl: useSSL
			? {
					rejectUnauthorized: false,
			}
			: false,
	});

	try {
		await client.connect();
		console.log("✅ Connected to DB (Seeding)");
		await client.query(SQL);
		console.log("🎉 Done seeding!");
	} catch (err) {
		console.error("❌ Error seeding database:", err);
	} finally {
		await client.end();
	}
}

main();
