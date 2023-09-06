const express = require("express");
const port = 4000;
const movies = require("./movies");

const app = express();

app.use(express.json());
app.use("/dipto", movies);
app.get("/", (req, res) => {
  res.send(`Server listening at http://localhost:${port}`);
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
