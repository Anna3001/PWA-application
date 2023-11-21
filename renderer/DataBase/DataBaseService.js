const MovieModel = require("./Model/MovieModel.js");
const MOVIES = require("../DataSeeder/MovieSeeder.js");


async function addMoviesFirst() {
  try {
    const newMovies = await MovieModel.bulkCreate(MOVIES);
  } catch (err) {
    console.error("Error in addMoviesFirst:", err);

    if (err.name === "SequelizeValidationError") {
      console.error("SequelizeValidationError:", err.errors);
    } else {
    }
  }
}

  addMoviesFirst();

async function addMovie(data) {
  try {
    console.log(data);
    const newMovie = await MovieModel.create(data);
    return newMovie;
  } catch (error) {
    throw error;
  }
}

async function getAllMovies() {
  const movies = await MovieModel.findAll();

  return movies;
}

async function getMovieByID(id) {
  const movie = await MovieModel.findAll({
    where: {
      ["id"]: id,
    },
  });

  return movie;
}

async function updateMovieByID(id, updatedData) {
  try {
    const movie = await MovieModel.findOne({
      where: {
        id: id,
      },
    });

    if (!movie) {
      throw new Error('"The film with the given ID was not found."');
    }

    await movie.update(updatedData);

    return movie;
  } catch (error) {
    throw new Error('An error occurred while updating the movie: ' + error.message);
  }
}

async function deleteMovieByID(id) {
  const movie = await MovieModel.destroy({
    where: {
      ["id"]: id,
    },
  });
}

async function getMoviesByTitleAndDirector(title, director) {
  const movies = await MovieModel.findAll({
    where: {
      ["title"]: title,
      ["director"]: director
    },
  });

  return movies;
}

module.exports = { 
  addMovie, getAllMovies, 
  getMovieByID, getMoviesByTitleAndDirector,
  deleteMovieByID, updateMovieByID };