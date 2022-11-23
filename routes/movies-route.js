const express = require('express');
const Movie = require('../models/Movie.model');
const router = express.Router();


router.get("/movies", (req, res, next) => {
    Movie.find()
      .then((theMovies) => {
        res.render("movies.hbs", { moviesDB: theMovies });
      })
      .catch((error) => {
        console.log("Error while getting the movies from the DB: ", error);
        next(error);
      });
  });
  
  router.get("/movie/:id", (req, res, next) => {
    let movieID = req.params.id;
    console.log(movieID);
    Movie.findById(movieID)
      .then((theMovie) => {
        console.log("Retrieved movie from DB:", theMovie);
        res.render("movie-details.hbs", theMovie);
      })
      .catch((error) => {
        console.log("Error while getting the movie from the DB: ", error);
        next(error);
      });
  });
  






router.get('/movies', async(req,res,next) => {
    try{
        const allMovies = await Movie.find();
        res.render('movies', {movies: allMovies});
    } catch(error){
        // console.log('Error', error); same as below
        next(error);
    }
})
router.get('/movies/:moviesID', async(req,res,next) => {
    try {
        const {moviesID} = req.params;
        const movies = await Movie.findById(moviesID);
        res.render('movie-details', movies);
    } catch(error) {
        next (error)
    }
})
module.exports = router;