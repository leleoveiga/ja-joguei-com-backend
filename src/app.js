const express = require("express");
const cors = require("cors");
require("dotenv/config");
const morgan = require("morgan");
const helmet = require("helmet");
const middlewares = require("./middlewares");
const api = require("./api");

const app = express();

app.use(helmet());
app.use(morgan("dev"));
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    message: "👋🌎🌍🌏 home :)",
  });
});

app.use("/api/", api);
app.use(middlewares.notFound);
app.use(middlewares.errorHandler);

module.exports = app;
