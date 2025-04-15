const express = require("express");
require("dotenv").config();
const app = express();
const PORT = process.env.PORT || 8000;

app.listen(PORT, (req, res) => {
	console.log(`listening at http://localhost:${PORT}`);
});
