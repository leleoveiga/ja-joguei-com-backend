const express = require("express");
const axios = require("axios");

const router = express.Router();

router.get("/:nick", async (req, res) => {
	try {
		let urlTarget =
			"https://br1.api.riotgames.com/lol/summoner/v4/summoners/by-name/?nick?api_key=?apiKey";
			// "https://br1.api.riotgames.com/lol/summoner/v4/summoners/by-name/?nick?api_key=RGAPI-c0da72af-36d5-4c79-81af-79acdd399bd3";

		// let nick = "diana pelada";
		// let apiKey = "RGAPI-c0da72af-36d5-4c79-81af-79acdd399bd3";

		urlTarget = urlTarget.replace("?nick", req.params.nick);
		urlTarget = urlTarget.replace("?apiKey", "RGAPI-c0da72af-36d5-4c79-81af-79acdd399bd3");

		const { data } = await axios.get(urlTarget);

		res.json(data);

		// axios
		// 	.get(urlTarget, {
		// 		headers: {
		// 			// "Access-Control-Allow-Origin": "*",
		// 		},
		// 	})
		// 	.then((response) => {
		// 		res.send({
		// 			data: response.data,
		// 			nick: response.name,
		// 			id: response.puuid,
		// 			json: response,
		// 			response,
		// 		});
		// 	});
	} catch (error) {
		next(error);
	}
});

module.exports = router;
