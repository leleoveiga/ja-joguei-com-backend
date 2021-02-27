const express = require("express");
const axios = require("axios");

const router = express.Router();

router.get("/:nick1/:nick2/:min/:max", async (req, res, next) => {
  try {
    const ids = await getPlayersId(req.params.nick1, req.params.nick2);
    const min = req.params.min;
    const max = req.params.max;

    // link api
    const urlTarget = `https://br1.api.riotgames.com/lol/match/v4/matchlists/by-account/${ids[0]}?api_key=${process.env.API_KEY}&beginIndex=${min}&endIndex=${max}`;

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
  let urlMatch = "";
  const foundMatches = [];

  for (let i = 0; i < matches.length; i++) {
    console.log(
      `---------------------match: ${i + 1}--------------------------`
    );
    urlMatch = `https://br1.api.riotgames.com/lol/match/v4/matches/${matches[i].gameId}?api_key=${process.env.API_KEY}`;

    // get partida pelo id
    const { data } = await axios.get(urlMatch);

    // pega a lista dos jogadores da partida
    const participantIdentities = data.participantIdentities;

    // add as partidas em q id2 aparece
    for (let j = 0; j < participantIdentities.length; j++) {
      // add nick 1 to match json
      if (participantIdentities[j].player.accountId === id1) {
        matches[i].nick1 = participantIdentities[j].player.summonerName;
      }

      if (participantIdentities[j].player.accountId === id2) {
        matches[i].nick2 = participantIdentities[j].player.summonerName; // add nick 2 to match json
        console.log(
          "////////////////////////match found!////////////////////////"
        );
        const championName1 = await getChampionNameByKey(matches[i].champion);
        const championIcon1 = getChampionIconLinkByName(championName1);
        const participant2Id = participantIdentities[j].participantId;
        const championKey2 = data.participants[participant2Id - 1].championId;
        const championName2 = await getChampionNameByKey(championKey2);
        const championIcon2 = getChampionIconLinkByName(championName2);

        matches[i].description = await convertQueueToString(matches[i].queue);
        matches[i].date = convertTimestampToDate(matches[i].timestamp);
        matches[i].icon1 = championIcon1;
        matches[i].icon2 = championIcon2;
        matches[
          i
        ].link = `https://www.leagueofgraphs.com/pt/match/br/${matches[i].gameId}`;
        foundMatches.push(matches[i]);
      }
    }
    console.log(
      `https://www.leagueofgraphs.com/pt/match/br/${matches[i].gameId}`
    );
  }

  return foundMatches;
}

async function getPlayersId(nick1, nick2) {
  const nicks = [nick1, nick2];
  const ids = [];

  let urlTarget = "";

  for (let i = 0; i < 2; i++) {
    urlTarget = `https://br1.api.riotgames.com/lol/summoner/v4/summoners/by-name/${nicks[i]}?api_key=${process.env.API_KEY}`;
    const { data } = await axios.get(urlTarget);
    ids.push(data.accountId);
  }

  console.log("--------------------selected ids--------------------");
  console.log(ids);
  console.log("----------------------------------------------------");
  return ids;
}

function convertTimestampToDate(timestamp) {
  const a = new Date(timestamp);
  const year = a.getFullYear();
  const month = a.getMonth() + 1;
  const date = a.getDate();
  const time = date + "/" + month + "/" + year;
  return time;
}

async function convertQueueToString(queue) {
  const queueList = require("../assets/queues.json");
  for (let i = 0; i < queueList.length; i++) {
    if (queueList[i].queueId === queue) {
      return queueList[i].description;
    }
  }
}

module.exports = router;
