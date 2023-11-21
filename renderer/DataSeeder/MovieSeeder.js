const { fakerPL } = require("@faker-js/faker");
const Movie = require("../Shared/Movie.js");
fakerPL.seed(123);

function generateMovieData() {
  const title = fakerPL.music.songName();
  const director = fakerPL.person.fullName();
  const country = fakerPL.location.country();
  const date = fakerPL.date.past();

  return new Movie(title, director, country, date);
}

let MOVIES = Array.from({ length: 30 }, () => generateMovieData());

module.exports = MOVIES;