const express = require("express");
const axios = require("axios");

const router = express.Router();

router.get("/:nick1/:nick2", async (req, res, next) => {
  try {
    // eu
    // 9rN5eV5oxKr5F1CnGgo0dzslcO6lomKMi9PM1KGqlKsfBpU
    // coringa
    // qoJ6azc92U-jbAjVsInJk0HTwDJWYe7V71mXsOOq25a1K1I

    const aa = [req.params.nick1, req.params.nick2];
    const ids = await getPlayersId(req.params.nick1, req.params.nick2);

    // link api
    let urlTarget =
      "https://br1.api.riotgames.com/lol/match/v4/matchlists/by-account/?id1?api_key=?apiKey&endIndex=10";
    // coloca a api key no link
    urlTarget = urlTarget.replace(
      "?apiKey",
      "RGAPI-f3661b37-17b4-4ec4-aee6-bcf1d5bd3e74"
    );
    // coloca o id do player no link
    urlTarget = urlTarget.replace("?id1", ids[0]);

    // pega a lista de partidas do player
    const { data } = await axios.get(urlTarget);

    // pega somente o id das partidas
    const matches = [];
    for (let i = 0; i < data.matches.length; i++) {
      matches.push(data.matches[i].gameId);
    }

    // filtra com o segundo id
    const foundMatches = await playedWith(ids[0], ids[1], matches);

    const matchesObject = [];
    foundMatches.forEach(function (gameIdFound, index, array) {
      data.matches.forEach(function (match, index, arrayAll) {
        if (match.gameId === gameIdFound) {
          // matchesObject.push(match);
          matchesObject.push(
            `https://matchhistory.br.leagueoflegends.com/pt/#match-details/BR1/${gameIdFound}?tab=overview`
          );
        }
      });
    });

    res.json(matchesObject);
  } catch (error) {
    next(error);
  }
});

async function playedWith(id1, id2, matches) {
  let urlMatch =
    "https://br1.api.riotgames.com/lol/match/v4/matches/?matchId?api_key=?apiKey";

  const foundMatches = [];

  for (let i = 0; i < matches.length; i++) {
    console.log(
      `-------------------partida da posição: ${i}----------------------------`
    );
    urlMatch =
      "https://br1.api.riotgames.com/lol/match/v4/matches/?matchId?api_key=?apiKey";
    urlMatch = urlMatch.replace(
      "?apiKey",
      "RGAPI-f3661b37-17b4-4ec4-aee6-bcf1d5bd3e74"
    );
    urlMatch = urlMatch.replace("?matchId", matches[i]);

    // ?matchId - ok
    // data.participantIdentities
    // for nisso
    // data.participantIdentities.player.accountId === id2 -> add na lista de partidas

    const { data } = await axios.get(urlMatch);

    const players = data.participantIdentities;
    for (let j = 0; j < players.length; j++) {
      console.log(players[j].player.accountId);
      if (players[j].player.accountId === id2) {
        foundMatches.push(matches[i]);
      }
    }
  }

  return foundMatches;
}

module.exports = router;
