const Joi = require('joi');
const express = require('express');
const router = express.Router();
let MOVIES = require("../DataSeeder/MovieSeeder.js");
const DBservice = require("../DataBase/DataBaseService.js");

const ep = require("./endpoints.json").endpoints;

router.use(express.json());

router.get('/', (req, res) => {
  res.send('Hello World!!!');
});

router.get(ep.getAll, (req, res) => {
  DBservice.getAllMovies().then((data) => {
    return res.status(200).json(data);
  });
});

// creating a new movie
router.post(ep.createMovie, (req, res) => {
  const { error } = validateMovie(req.body);
  if (error) {
    res.status(400).send(error.details[0].message);
    return;
  }

  let newMovie = req.body;

  DBservice.addMovie(newMovie).then(() => {
    return res.status(201)
  }).catch((err) => {
    res.status(500).send("Failure! Failed to add a new record to the database.");
  });
});

router.put(ep.updateByID, (req, res) => {

  DBservice.updateMovieByID(req.params.id, req.body).then(() => {
    res.status(200).json({ message: "Success! The record has been updated in the database." })
  }).catch((err) => {
    res.status(500).send("Failure! Failed to update a record in the database.");
  });

});

router.delete(ep.deleteByID, (req, res) => {
  DBservice.deleteMovieByID(req.params.id).then(() => {
    res.status(200).json({ message: "Usunięto pomyślnie" });
  });
});

router.get(ep.getByID, (req, res) => {
  DBservice.getMovieByID(req.params.id).then((data) => {
    return res.status(200).json(data);
  });

});

router.get(ep.getByTitleDirector, (req, res) => {
  DBservice.getMoviesByTitleAndDirector(req.params.title, req.params.director).then((data) => {
    return res.status(200).json(data);
  });

});

function validateMovie(movie) {
  const schema = {
    title: Joi.string().required(),
    director: Joi.string().required(),
    country: Joi.string().required(),
    date: Joi.string().required()
  }

  return Joi.validate(movie, schema);
}

module.exports = router;