const express = require("express");
const path = require("path");
const cors = require("cors");
require("dotenv/config");
const morgan = require("morgan");
const helmet = require("helmet");
const middlewares = require("./middlewares");
const api = require("./api");

const app = express();

app.use(
  helmet({
    contentSecurityPolicy: false,
  })
);
app.use(morgan("dev"));
app.use(cors());
app.use(express.json());

app.use("/api/", api);
// production
if (process.env.NODE_ENV === "production") {
  // static folder
  app.use(express.static(path.join(__dirname, "../public/")));

  // handle spa
  app.get(/.*/, (req, res) => {
    res.sendFile(__dirname + "../public/index.html");
  });
}

app.get("/", (req, res) => {
  res.json({
    message: "👋🌎🌍🌏 home :)",
  });
});
app.use(middlewares.notFound);
app.use(middlewares.errorHandler);

module.exports = app;
