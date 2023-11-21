import { MovieModel } from "../Models/MovieModel.js";
import { generalVM } from "../viewModels/generalViewModel.js";
const URL = "http://localhost:3000/";

async function fetchAPI(ep, data) {
  return fetch(ep, data).then((res) => {
    if (res.ok) { return res.json(); }
    else { throw new Error("ERROR!!!"); }
  });
}

export async function getMovieById(id) {
  const ep = `${URL}api/getMovieByID/${id}`;
  
  await fetchAPI(ep, {}).then((Movie) => {
    const movie = Movie.map((movieM) => {
      return new MovieModel(movieM);
    });

    generalVM.getMovieViewModel().update(movie);
  });
}

export async function getMoviesByTD(title, director) {
  const ep = `${URL}api/getByTD/${title}/${director}`;
  
  await fetchAPI(ep, {}).then((Movie) => {
    const movie = Movie.map((movieM) => {
      return new MovieModel(movieM);
    });

    generalVM.getMovieViewModel().update(movie);
  });
}

export async function getAllMovies(start) {
  const ep = `${URL}api/getAllMovies`;
  
  await fetchAPI(ep, {}).then((Movie) => {
    const movies = Movie.map((movieM) => {
      return new MovieModel(movieM);
    });
    
    if (start > movies.length) { return;}
    const cuttedMovies = movies.filter((element, index) => index >= start && index <= (start + 6));
    generalVM.getMovieViewModel().update(cuttedMovies);
  });
}

export async function updateById(movie, id) {
  const ep = `${URL}api/updateMovieByID/${id}`;

  console.log(movie);

  const response = await fetchAPI(ep, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(movie),
  });
}

export async function createMovie(movie) {
  const ep = `${URL}api/createMovie`;

  const response = await fetchAPI(ep, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(movie),
  });
}  

export async function deleteById(id) {
  const ep = `${URL}api/deleteMovieByID/${id}`;

  await fetchAPI(ep, { method: "DELETE" }).then(
    (message) => { console.log(message.message);}
  );
}