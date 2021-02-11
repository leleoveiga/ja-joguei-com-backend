const express = require("express");
const getSummonerByNick = require("./getSummonerByNick");

const router = express.Router();

router.get("/", (req, res) => {
	res.json({
		message: "API - 👋🌎🌍🌏",
	});
});

router.use("/get", getSummonerByNick);

module.exports = router;
