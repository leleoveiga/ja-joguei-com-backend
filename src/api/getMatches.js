const express = require("express");
const axios = require("axios");

const router = express.Router();

router.get("/:nick1/:nick2", async (req, res, next) => {
  try {
    const ids = await getPlayersId(req.params.nick1, req.params.nick2);

    // link api
    let urlTarget =
      "https://br1.api.riotgames.com/lol/match/v4/matchlists/by-account/?id0?api_key=?apiKey&endIndex=50";

    // coloca a api key e id do player no link
    urlTarget = urlTarget.replace("?apiKey", process.env.API_KEY);
    urlTarget = urlTarget.replace("?id0", ids[0]);

    // pega a lista de partidas do player
    const { data } = await axios.get(urlTarget);

    // filtra com o segundo id
    const foundMatches = await playedWith(ids[0], ids[1], data.matches);

    res.json(foundMatches);
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
      `---------------------match: ${i + 1}--------------------------`
    );
    urlMatch =
      "https://br1.api.riotgames.com/lol/match/v4/matches/?matchId?api_key=?apiKey";
    urlMatch = urlMatch.replace("?apiKey", process.env.API_KEY);
    urlMatch = urlMatch.replace("?matchId", matches[i].gameId);

    // get partida pelo id
    const { data } = await axios.get(urlMatch);

    // pega a lista dos jogadores da partida
    const participantIdentities = data.participantIdentities;

    // add as partidas em q id2 aparece
    for (let j = 0; j < participantIdentities.length; j++) {
      if (participantIdentities[j].player.accountId === id2) {
        console.log(
          "////////////////////////match found!////////////////////////"
        );
        const championName1 = await getChampionNameByKey(matches[i].champion);
        const championIcon1 = getChampionIconLinkByName(championName1);
        const participant2Id = participantIdentities[j].participantId;
        const championKey2 = data.participants[participant2Id - 1].championId;
        const championName2 = await getChampionNameByKey(championKey2);
        const championIcon2 = getChampionIconLinkByName(championName2);

        matches[i].icon1 = championIcon1;
        matches[i].icon2 = championIcon2;
        matches[
          i
        ].link = `https://matchhistory.br.leagueoflegends.com/pt/#match-details/BR1/${matches[i].gameId}?tab=overview`;
        foundMatches.push(matches[i]);
      }
    }
    console.log(
      `https://matchhistory.br.leagueoflegends.com/pt/#match-details/BR1/${matches[i].gameId}?tab=overview`
    );
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
  }

  console.log("--------------------selected ids--------------------");
  console.log(ids);
  console.log("----------------------------------------------------");
  return ids;
}

module.exports = router;
