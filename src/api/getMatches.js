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

async function playedWith(id1, id2, matches) {
  const foundMatches = [];

  const dataList = [];
  await getMatchesInParallel(matches, dataList);
  await getDetailedCommonMatches(matches, dataList, id1, id2, foundMatches);

  return foundMatches;
}

async function getDetailedCommonMatches(
  matches,
  dataList,
  id1,
  id2,
  foundMatches
) {
  for (let i = 0; i < matches.length; i++) {
    const data = dataList[i];
    // pega a lista dos jogadores da partida
    const participantIdentities = data.participantIdentities;

    for (let j = 0; j < participantIdentities.length; j++) {
      // procura e add informações do jogador 1
      if (participantIdentities[j].player.currentAccountId === id1) {
        const nick1 = participantIdentities[j].player.summonerName;
        const participant1Id = participantIdentities[j].participantId;
        const player1KDA = playerKDAByParticipantId(
          data.participants[participant1Id - 1]
        );
        matches[i].urlparticipant = j + 1;
        matches[i].nick1 = nick1;
        matches[i].player1KDA = player1KDA;
      }

      // achou id2, e add o resto das informações
      if (participantIdentities[j].player.currentAccountId === id2) {
        console.log(
          `////////////////////////match ${i} is common!////////////////////////`
        );
        const queueMode = await convertQueueToString(matches[i].queue);
        const date = convertTimestampToDate(matches[i].timestamp);
        const championName1 = await getChampionNameByKey(matches[i].champion);
        const championIcon1 = getChampionIconLinkByName(championName1);

        const participant2Id = participantIdentities[j].participantId;
        const nick2 = participantIdentities[j].player.summonerName;
        const player2KDA = playerKDAByParticipantId(
          data.participants[participant2Id - 1]
        );
        const championKey2 = data.participants[participant2Id - 1].championId;
        const championName2 = await getChampionNameByKey(championKey2);
        const championIcon2 = getChampionIconLinkByName(championName2);

        matches[i].description = queueMode;
        matches[i].date = date;
        matches[i].nick2 = nick2;
        matches[i].player2KDA = player2KDA;
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
}

async function getMatchesInParallel(matches, dataList) {
  const promises = [];

  for (let i = 0; i < matches.length; i++) {
    const delay = 60 * i;
    // eslint-disable-next-line no-async-promise-executor
    const promise = new Promise(async function (resolve) {
      // eslint-disable-next-line promise/param-names
      await new Promise((res) => setTimeout(res, delay));
      console.log(`promise ${i}`);
      const url = `https://br1.api.riotgames.com/lol/match/v4/matches/${matches[i].gameId}?api_key=${process.env.API_KEY}`;
      const result = await axios.get(url);
      resolve(result);
    });

    promises.push(promise);
  }
  await Promise.all(promises).then(async function (results) {
    results.forEach(function (response) {
      const { data } = response;
      dataList.push(data);
    });
  });
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

async function getChampionNameByKey(championKey) {
  const champions = require("../assets/champions.json");
  return champions[championKey];
}

function getChampionIconLinkByName(name) {
  const urlIcon = `http://ddragon.leagueoflegends.com/cdn/11.4.1/img/champion/${name}.png`;
  return urlIcon;
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

function playerKDAByParticipantId(participantData) {
  const kills = participantData.stats.kills;
  const deaths = participantData.stats.deaths;
  const assists = participantData.stats.assists;
  const kda = kills + "/" + deaths + "/" + assists;
  return kda;
}

module.exports = router;
