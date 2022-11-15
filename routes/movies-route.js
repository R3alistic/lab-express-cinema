const express = require('express');
const Movie = require('../models/Movie.model');
const router = express.Router();


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