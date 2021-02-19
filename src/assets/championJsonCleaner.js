const fs = require("fs");
const path = require("path");
const caminho = path.join(__dirname, "/champions.json");

const { data } = require("./championsOld.json");
const champions = {};
for (let i = 0; i < Object.keys(data).length; i++) {
  const key = parseInt([data[Object.keys(data)[i]].key]);
  champions[key] = data[Object.keys(data)[i]].id;
}

console.log(champions);
const championsJson = JSON.stringify(champions);
fs.writeFileSync(caminho, championsJson);
