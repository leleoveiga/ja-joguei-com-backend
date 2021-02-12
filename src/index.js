// const express = require("express");
// const app = express();
// const bodyParser = require("body-parser");

const app = require("./app");

const port = 5000;

app.listen(port, () => {
  /* eslint-disable no-console */
  console.log(`Backend rodando em: http://localhost:${port}`);
  /* eslint-enable no-console */
});
