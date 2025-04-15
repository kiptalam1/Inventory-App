const express = require("express");
require("dotenv").config();
const app = express();
const PORT = process.env.PORT || 8000;

//render views and assets
app.set("view engine", "ejs");
app.use(express.static("public"));

app.get("/", (req, res) => {
	res.render("home");
});

app.listen(PORT, (req, res) => {
	console.log(`listening at http://localhost:${PORT}`);
});
