const { DataTypes } = require("sequelize");
const sequelize = require("../startDataBase.js");

const MovieModel = sequelize.define("Movie", {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  director: {
    type: DataTypes.STRING,
  },
  country: {
    type: DataTypes.STRING,
  },
  date: {
    type: DataTypes.DATE,
  },
});

module.exports = MovieModel;
