const express = require("express");
const detailedMatches = require("./getDetailedMatches");

const router = express.Router();

router.get("/", (req, res) => {
  res.json({
    message: "API - 👋🌎🌍🌏",
  });
});

router.use("/getMatches", detailedMatches);

module.exports = router;
