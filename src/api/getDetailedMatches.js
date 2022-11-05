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
  console.log(
    "🚀 ~ file: getDetailedMatches.js ~ line 32 ~ playedWith ~ commonMatches",
    commonMatches
  );

  return commonMatches;
}

function findCommonMatches(matches, id1, id2, commomMatchesList) {
  matches.forEach((match) => {
    const rawMatchData = {
      matchData: {},
      player1Data: {},
      player2Data: {},
    };
    match.participants.forEach((player, index) => {
      if (player.puuid === id1) {
        rawMatchData.player1Data = player;
        rawMatchData.player1Data.index = index + 1;
      } else if (player.puuid === id2) {
        rawMatchData.player2Data = player;
        rawMatchData.matchData = match;
        commomMatchesList.push(rawMatchData);
      }
    });
  });
}

async function getDetailedCommonMatches(matches, id1, id2, commonMatches) {
  const commomMatchesList = [];

  findCommonMatches(matches, id1, id2, commomMatchesList);

  const formattedCommonMatchList = commomMatchesList.map(
    async (rawMatchData, i) => {
      console.log(
        `//////////////////////// appending match ${i} ////////////////////////`
      );
      const queueMode = await convertQueueToString(
        rawMatchData.matchData.queueId
      );
      const date = convertTimestampToDate(
        rawMatchData.matchData.gameStartTimestamp
      );
      const matchData = {
        gameId: rawMatchData.matchData.gameId,
        description: queueMode,
        date: date,
      };

      // add player 1 data
      const nick1 = rawMatchData.player1Data.summonerName;
      const player1KDA = getPlayerKDA(rawMatchData.player1Data);
      const championName1 = rawMatchData.player1Data.championName;
      const championIcon1 = getChampionIconLinkByName(championName1);
      matchData.link = `https://www.leagueofgraphs.com/pt/match/br/${matchData.gameId}#participant${rawMatchData.player1Data.index}`;
      matchData.nick1 = nick1;
      matchData.player1KDA = player1KDA;
      matchData.icon1 = championIcon1;
      matchData.player1Win = rawMatchData.player1Data.win;

      // add player 2 data
      const nick2 = rawMatchData.player2Data.summonerName;
      const player2KDA = getPlayerKDA(rawMatchData.player2Data);
      const championName2 = rawMatchData.player2Data.championName;
      const championIcon2 = getChampionIconLinkByName(championName2);
      matchData.nick2 = nick2;
      matchData.player2KDA = player2KDA;
      matchData.icon2 = championIcon2;
      matchData.player2Win = rawMatchData.player2Data.win;
      commonMatches.push(matchData);

      console.log(`match ${i} ${matchData.link}`);
    }
  );
  const result = await Promise.all(formattedCommonMatchList);

  commonMatches = result;
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
    const nick = encodeURI(nicks[i]);
    const summonerUrl = `https://br1.api.riotgames.com/lol/summoner/v4/summoners/by-name/${nick}?api_key=${process.env.API_KEY}`;
    const { data } = await axios.get(summonerUrl);
    ids.push(data.puuid);
  }

  console.log("--------------------selected ids--------------------");
  console.log(ids);
  console.log("----------------------------------------------------");
  return ids;
}

function getChampionIconLinkByName(name) {
  const urlIcon = `http://ddragon.leagueoflegends.com/cdn/12.21.1/img/champion/${name}.png`;
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
  const queueMode = queueList.find((queueMode) => queueMode.queueId === queue);
  return queueMode.description ?? "Custom games";
}

function getPlayerKDA(playerData) {
  const kills = playerData.kills;
  const deaths = playerData.deaths;
  const assists = playerData.assists;
  const kda = kills + "/" + deaths + "/" + assists;
  return kda;
}

module.exports = router;
