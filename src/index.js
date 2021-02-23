const app = require("./app");

const port = 5000;

app.listen(port, () => {
  console.log(`Backend rodando em: http://localhost:${port}`);
});
