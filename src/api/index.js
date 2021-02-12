const express = require("express");
const getMatches = require("./getMatches");

const router = express.Router();

router.get("/", (req, res) => {
  res.json({
    message: "API - 👋🌎🌍🌏",
  });
});

router.use("/getMatches", getMatches);

module.exports = router;
