const express = require("express");
const axios = require("axios");

const router = express.Router();

router.get("/:nick1/:nick2/:min/:count", async (req, res, next) => {
  try {
    const [id1, id2] = await getPlayersId(req.params.nick1, req.params.nick2);
    const min = req.params.min;
    const count = req.params.count;

    // link api
    const matchHistoryUrl = `https://americas.api.riotgames.com/lol/match/v5/matches/by-puuid/${id1}/ids?start=${min}&count=${count}&api_key=${process.env.API_KEY}`;

    // pega a lista de partidas do player
    const { data } = await axios.get(matchHistoryUrl);
    // filtra com o segundo id
    const foundMatches = await playedWith(id1, id2, data);

    res.json(foundMatches);
  } catch (error) {
    next(error);
  }
});

async function playedWith(id1, id2, matchesIDs) {
  const commonMatches = [];
  const matches = [];

  await getMatches(matchesIDs, matches);
  await getDetailedCommonMatches(matches, id1, id2, commonMatches);

  return commonMatches;
}

async function getDetailedCommonMatches(matches, id1, id2, commonMatches) {
  for (let i = 0; i < matches.length; i++) {
    // pega a lista dos jogadores da partida
    const players = matches[i].participants;

    for (let j = 0; j < players.length; j++) {
      const player = players[j];
      // procura e add informações do jogador 1
      if (player.puuid === id1) {
        const nick1 = player.summonerName;
        const player1KDA = getPlayerKDA(player);
        const championName1 = await getChampionNameByKey(player.championId);
        const championIcon1 = getChampionIconLinkByName(championName1);

        matches[ // não está funcionando
          i
        ].link = `https://www.leagueofgraphs.com/pt/match/br/${matches[i].gameId}#participant${j}`;
        matches[i].nick1 = nick1;
        matches[i].player1KDA = player1KDA;
        matches[i].icon1 = championIcon1;
      }

      // achou id2, e add o resto das informações
      if (player.puuid === id2) {
        console.log(
          `////////////////////////match ${i} is common!////////////////////////`
        );
        const queueMode = await convertQueueToString(matches[i].queueId);
        const date = convertTimestampToDate(matches[i].gameStartTimestamp);

        matches[i].description = queueMode;
        matches[i].date = date;

        const nick2 = player.summonerName;
        const player2KDA = getPlayerKDA(player);
        const championKey2 = player.championId;
        const championName2 = await getChampionNameByKey(championKey2);
        const championIcon2 = getChampionIconLinkByName(championName2);

        matches[i].nick2 = nick2;
        matches[i].player2KDA = player2KDA;
        matches[i].icon2 = championIcon2;
        commonMatches.push(matches[i]);
      }
    }
    console.log(`match ${i} ${matches[i].link}`);
  }
}

async function getMatches(matches, dataList) {
  const promises = [];
  console.log("////////////////////////////////matches: \n", matches);
  for (let i = 0; i < matches.length; i++) {
    const delay = 60 * i;
    // eslint-disable-next-line no-async-promise-executor
    const getMatchPromise = new Promise(async function (resolve) {
      await new Promise((resolve) => setTimeout(resolve, delay));

      const url = `https://americas.api.riotgames.com/lol/match/v5/matches/${matches[i]}?api_key=${process.env.API_KEY}`;
      console.log(url);
      console.log(`//////////////////////promise ${i}`);
      const match = axios.get(url);
      resolve(match);
    });
    promises.push(getMatchPromise);
  }
  await Promise.all(promises).then(function (results) {
    results.forEach(function (response) {
      const { data } = response;
      dataList.push(data.info);
    });
  });
}

async function getPlayersId(nick1, nick2) {
  const nicks = [nick1, nick2];
  const ids = [];

  for (let i = 0; i < 2; i++) {
    const summonerUrl = `https://br1.api.riotgames.com/lol/summoner/v4/summoners/by-name/${nicks[i]}?api_key=${process.env.API_KEY}`;
    const { data } = await axios.get(summonerUrl);
    ids.push(data.puuid);
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
  const fullDate = new Date(timestamp);
  const year = fullDate.getFullYear();
  const month = fullDate.getMonth() + 1;
  const date = fullDate.getDate();
  const matchDate = date + "/" + month + "/" + year;
  return matchDate;
}

async function convertQueueToString(queue) {
  const queueList = require("../assets/queues.json");
  for (let i = 0; i < queueList.length; i++) {
    if (queueList[i].queueId === queue) {
      return queueList[i].description;
    }
  }
}

function getPlayerKDA(playerData) {
  const kills = playerData.kills;
  const deaths = playerData.deaths;
  const assists = playerData.assists;
  const kda = kills + "/" + deaths + "/" + assists;
  return kda;
}

module.exports = router;
