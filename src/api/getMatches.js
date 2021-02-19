const express = require("express");
const axios = require("axios");

const router = express.Router();

router.get("/:nick1/:nick2", async (req, res, next) => {
  try {
    const ids = await getPlayersId(req.params.nick1, req.params.nick2);

    // link api
    let urlTarget =
      "https://br1.api.riotgames.com/lol/match/v4/matchlists/by-account/?id1?api_key=?apiKey&endIndex=50";
    urlTarget = urlTarget.replace("?apiKey", process.env.API_KEY);

    urlTarget = urlTarget.replace("?id1", ids[0]);
    // coloca a api key e id do player no link

    // pega a lista de partidas do player
    const { data } = await axios.get(urlTarget);

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
          matchesObject.push(match);
          // matchesObject.push(
          //   `https://matchhistory.br.leagueoflegends.com/pt/#match-details/BR1/${gameIdFound}?tab=overview`
          // );
        }
      });
    });

    res.json(matchesObject);
  } catch (error) {
    next(error);
  }
});

async function getChampionNameByKey(championKey) {
  const champions = require("../assets/champions.json");
  return champions[championKey];
}

function getChampionIconLinkByName(name) {
  const urlIcon = `http://ddragon.leagueoflegends.com/cdn/11.4.1/img/champion/${name}.png`;
  return urlIcon;
}

async function playedWith(id1, id2, matches) {
  let urlMatch =
    "https://br1.api.riotgames.com/lol/match/v4/matches/?matchId?api_key=?apiKey";

  const foundMatches = [];

  for (let i = 0; i < matches.length; i++) {
    console.log(
      `-------------------match: ${i + 1}----------------------------`
    );
    urlMatch =
      "https://br1.api.riotgames.com/lol/match/v4/matches/?matchId?api_key=?apiKey";
    urlMatch = urlMatch.replace("?apiKey", process.env.API_KEY);
    urlMatch = urlMatch.replace("?matchId", matches[i]);

    // get partida pelo id
    const { data } = await axios.get(urlMatch);

    const players = data.participantIdentities;
    for (let j = 0; j < players.length; j++) {
      console.log(players[j].player.accountId);
      if (players[j].player.accountId === id2) {
    // pega a lista dos jogadores da partida
    // add as partidas em q id2 aparece
        foundMatches.push(matches[i]);
      }
    }
  }

  return foundMatches;
}

async function getPlayersId(nick1, nick2) {
  const nicks = [nick1, nick2];
  const ids = [];

  let urlTarget =
    "https://br1.api.riotgames.com/lol/summoner/v4/summoners/by-name/?nick?api_key=?apiKey";

  for (let i = 0; i < 2; i++) {
    urlTarget =
      "https://br1.api.riotgames.com/lol/summoner/v4/summoners/by-name/?nick?api_key=?apiKey";
    urlTarget = urlTarget.replace("?nick", nicks[i]);
    urlTarget = urlTarget.replace("?apiKey", process.env.API_KEY);
    const { data } = await axios.get(urlTarget);
    ids.push(data.accountId);
    console.log("--------------------selected ids--------------------");
    console.log(ids);
    console.log("----------------------------------------------------");
  }

  return ids;
}

module.exports = router;
