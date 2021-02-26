const app = require("./app");
const path = require("path");

// production
if (process.env.NODE_ENV === "production") {
  // static folder
  app.use(express.static(path.join(__dirname, "../public/")));

  // handle spa
  app.get(/.*/, (req, res) => {
    res.sendFile(path.join(__dirname + "../public/index.html"));
  });
}

const port = 5000;

app.listen(port, () => {
  console.log(`Backend rodando em: http://localhost:${port}`);
});
