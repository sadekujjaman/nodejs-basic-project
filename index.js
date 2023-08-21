const express = require("express");
const port = 4000;
const movies = require("./movies");

const app = express();

app.use(express.json());
app.use("/api/v1/movies", movies);

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
