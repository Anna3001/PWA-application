const sqlite3 = require("sqlite3");
const Sequelize = require("sequelize");
const config = require("../config/database.json");

const environment = process.env.NODE_ENV || "development";
const dbConfig = config[environment];

const sequelize = new Sequelize(dbConfig);
module.exports = sequelize;
const connectMovieController = require("../Controllers/connectMovieController.js");

function x (){

}
sequelize
  .authenticate()
  .then(() => {
    console.log("Successfull!");
  })
  .catch((err) => {
    console.error("Unable to connect to the database:", err);
  });

sequelize.sync().then(() => {
  const Movies = require("./Model/MovieModel.js");
  
  Movies.sync().then(() => {
    console.log(Movies === sequelize.models.Movie);

    const DBservice = require("./DataBaseService.js");
    connectMovieController();
  });
});

module.exports = x;