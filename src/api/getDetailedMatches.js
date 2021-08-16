const express = require("express");
const axios = require("axios");

const router = express.Router();

router.get("/:nick1/:nick2/:min/:count", async (req, res, next) => {
  try {
    const ids = await getPlayersId(req.params.nick1, req.params.nick2);
    const min = req.params.min;
    const count = req.params.count;

    // link api
    const matchHistoryUrl = `https://americas.api.riotgames.com/lol/match/v5/matches/by-puuid/${ids[0]}/ids?start=${min}&count=${count}&api_key=${process.env.API_KEY}`;

    // pega a lista de partidas do player
    //  const { data } = await axios.get(matchHistoryUrl);
    const { data } = await axios.get(matchHistoryUrl);
    // filtra com o segundo id
    const foundMatches = await playedWith(ids[0], ids[1], data);

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
  console.log("🚀 ~ file: getDetailedMatches.js ~ line 44 ~ matches", dataList);

  for (let i = 0; i < dataList.length; i++) {
    const data = dataList[i];
    // pega a lista dos jogadores da partida
    const participantIdentities = data.participants;

    for (let j = 0; j < participantIdentities.length; j++) {
      // procura e add informações do jogador 1
      if (participantIdentities[j].puuid === id1) {
        const nick1 = participantIdentities[j].summonerName;
        const player1KDA = playerKDAByParticipantId(data.participants[j]);
        dataList[i].urlparticipant = j + 1;
        dataList[i].nick1 = nick1;
        dataList[i].player1KDA = player1KDA;
        dataList[i].player1KDA = player1KDA;
        const championName1 = await getChampionNameByKey(
          dataList[i].participants[j].championId
        );
        const championIcon1 = getChampionIconLinkByName(championName1);
        dataList[i].icon1 = championIcon1;
      }

      // achou id2, e add o resto das informações
      if (participantIdentities[j].puuid === id2) {
        console.log(
          `////////////////////////match ${i} is common!////////////////////////`
        );
        const queueMode = await convertQueueToString(dataList[i].queueId);
        const date = convertTimestampToDate(dataList[i].gameStartTimestamp);

        // const participant2Id = participantIdentities[j].participantId;
        const nick2 = participantIdentities[j].summonerName;

        const player2KDA = playerKDAByParticipantId(data.participants[j]);
        const championKey2 = data.participants[j].championId;
        // const championKey2 = data.participants[participant2Id - 1].championId;
        const championName2 = await getChampionNameByKey(championKey2);
        const championIcon2 = getChampionIconLinkByName(championName2);

        dataList[i].description = queueMode;
        dataList[i].date = date;
        dataList[i].nick2 = nick2;
        dataList[i].player2KDA = player2KDA;
        dataList[i].icon2 = championIcon2;
        dataList[
          i
        ].link = `https://www.leagueofgraphs.com/pt/match/br/${dataList[i].gameId}#participant${dataList[i].urlparticipant}`;
        foundMatches.push(dataList[i]);
      }
    }
    console.log(
      `match ${i} https://www.leagueofgraphs.com/pt/match/br/${dataList[i].gameId}#participant${dataList[i].urlparticipant}`
    );
  }
}

async function getMatchesInParallel(matches, dataList) {
  const promises = [];
  console.log("////////////////////////////////matches: \n", matches);
  for (let i = 0; i < matches.length; i++) {
    const delay = 60 * i;
    // eslint-disable-next-line no-async-promise-executor
    const promise = new Promise(async function (resolve) {
      // eslint-disable-next-line promise/param-names
      await new Promise((res) => setTimeout(res, delay));
      const url = `https://americas.api.riotgames.com/lol/match/v5/matches/${matches[i]}?api_key=${process.env.API_KEY}`;
      console.log(url);
      console.log(`//////////////////////promise ${i}`);
      // try {
      const match = await axios.get(url);
      resolve(match);
      // } catch (error) {
      //   console.log(error.response.status);
      // }
    });
    // info.participants[i].puuid
    promises.push(promise);
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

  let urlTarget = "";
  for (let i = 0; i < 2; i++) {
    urlTarget = `https://br1.api.riotgames.com/lol/summoner/v4/summoners/by-name/${nicks[i]}?api_key=${process.env.API_KEY}`;
    const { data } = await axios.get(urlTarget);
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
  const kills = participantData.kills;
  const deaths = participantData.deaths;
  const assists = participantData.assists;
  const kda = kills + "/" + deaths + "/" + assists;
  return kda;
}

module.exports = router;
