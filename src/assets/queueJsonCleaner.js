const fs = require("fs");
const path = require("path");
const caminho = path.join(__dirname, "/queues.json");
const data = require("./queuesOld.json");

for (let i = Object.keys(data).length - 1; i > -1; i--) {
  if (data[i].notes) {
    if (
      data[i].notes.includes("deprecated") ||
      data[i].notes.includes("Deprecated")
    ) {
      data.splice([i], 1);
    }
  }
  if (data[i].description) {
    if (data[i].description.endsWith("games")) {
      const newDesc = data[i].description.slice(0, -6);
      data[i].description = newDesc;
    }
  }
}
// console.log(data);
const queuesJson = JSON.stringify(data);
fs.writeFileSync(caminho, queuesJson);
