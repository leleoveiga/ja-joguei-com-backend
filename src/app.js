const express = require("express");
const cors = require("cors");
// const morgan = require("morgan");
// const helmet = require("helmet");

// require("dotenv").config();

const middlewares = require("./middlewares");
const api = require("./api");

const app = express();
app.set("trust proxy", 1);

// app.use(morgan("dev"));
// app.use(helmet());
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
	res.json({
		message: "🦄🌈✨👋🌎🌍🌏✨🌈🦄",
	});
});

app.use("/api/", api);

app.use(middlewares.notFound);
app.use(middlewares.errorHandler);

module.exports = app;
