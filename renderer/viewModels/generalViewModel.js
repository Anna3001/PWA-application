
import { movieViewModel } from "./movieViewModel.js"
import * as movieService from "../services/movieService.js"

export class generalViewModel {
  constructor () {
    var self = this;
    let startID = 0;
    self.movieViewModel = new movieViewModel();

    self.deleteByID = () => {
      movieService.deleteById(document.getElementById("id").value);
    };

    self.getByID = () => {
      movieService.getMovieById(document.getElementById("id-get").value);
    };

    self.getByTD = () => {
      let formValues = this.readForm(
        document.getElementById("get-movie-TD").elements
      );

      movieService.getMoviesByTD(formValues.title, formValues.director);
    }

    self.updateMovieByID = () => {
      let formValues = this.readForm(
        document.getElementById("update-movie-form").elements
      );

      movieService.updateById(formValues, formValues.id);
    };

    self.getAllMovies = () => {
      startID = 0;
      movieService.getAllMovies(startID);
    }  

    self.addMovie = () => {
      let formValues = this.readForm(document.getElementById("add-movie-form").elements);
      console.log(formValues);
      movieService.createMovie(formValues);
    };

    self.next = () => {
      startID = startID + 7;
      movieService.getAllMovies(startID);
    } 

    self.back = () => {
      if (startID - 7 >= 0) {
        startID = startID - 7;
        movieService.getAllMovies(startID);
      }
    } 

  }

  getMovieViewModel() {
    return this.movieViewModel;
  };


  readForm(elements) {
    const formValues = {};

    for (const element of elements) {
      if (element.name && element.value != "") { formValues[element.name] = element.value; }
    }

    return formValues;
  }

}

export let generalVM = {};

window.onload = function() {
    generalVM = new generalViewModel();
    ko.applyBindings(generalVM, document.querySelector("#knockout-app"));
}  