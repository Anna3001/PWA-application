const express = require("express");
const dv = require("dotenv");
const bp = require("body-parser");
const fs = require('fs');

const routes = require("./MovieController.js");

const app = express();
dv.config();

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*'); // Wartość '*' oznacza, że dowolna strona może korzystać z zasobów.
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

const portConfig = "../config/p.json";

const connectMovieController = function() {
  try {
    // const jsonFile = JSON.parse(fs.readFileSync(portConfig, "utf8"));

    const port = 3000;

    app.listen(port, () => console.log(`Listening on port ${port}...`))

  } catch (err) {
    console.error(`Error! ${err.message}`);
    process.exit(1);
  }

  // This middleware processes data sent in JSON format.
  app.use(bp.json());
  app.use(bp.urlencoded({ extended: true }));
  app.use("", routes);
};

module.exports = connectMovieController;
