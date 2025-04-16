const express = require("express");
require("dotenv").config();
const indexRouter = require("./routes/indexRoutes");
const app = express();
const PORT = process.env.PORT || 8000;

//render views and assets
app.set("view engine", "ejs");
app.use(express.static("public"));

app.use(express.urlencoded({ extended: true }));


app.use("/", indexRouter);

// Error checking
app.use((req, res) => {
	res.status(404).send("404 Not Found");
});

app.use((err, req, res, next) => {
	console.error(err.stack);
	res.status(500).send("Something broke!");
});

app.listen(PORT, (req, res) => {
	console.log(`listening at http://localhost:${PORT}`);
});
