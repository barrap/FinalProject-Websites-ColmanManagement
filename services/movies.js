const Movie = require('../models/movies')

const mongoose = require('mongoose');
mongoose.connect(process.env.CONNECTION_STRING)


// Function to get all the movies
async function getMovies() {

    return await Movie.find();
}

// Function to delete a movie
async function deleteMovie(id) {
    await Movie.deleteOne({ _id: id })
}

// Function to add a movie
function addMovie(title, year, director, length, main_actors, type, preview, trailer, price) {
    var movie = new Movie({
        _id: title,
        year: year,
        director: director,
        length: length, 
        main_actors: main_actors,
        type: type,
        preview: preview,
        trailer: trailer,
        price: price

    })
    return movie.save();
}

// Function to search the array
async function search(param, value) {

    // Uses a switch according to the search parameter the user selected
    switch (param) {
        case "title":
            return await Movie.find({ "_id": { "$regex": value, "$options": "i" } })
            break;
        case "director":
            return await Movie.find({ "director": { "$regex": value, "$options": "i" } })
        case "date":
            return await Movie.find({ "year": { "$gte": parseInt(value, 10) } })
        case "Actors":
            return await Movie.find({ "Actors": { "$regex": value, "$options": "i" } })
        default:
            break;
    }
}


// Function to update data about the movie (only synopsis, views and profit)
function update(movie_index, new_preview, new_views, new_profit) {
    if (new_preview) {
        movies[movie_index].preview = new_preview
    }

    // Checks if the new amount of views can be updated (provided it's larger than the current amount)
    if (new_views > movies[movie_index].views) {
        movies[movie_index].views = new_views
    }

    // Checks if the new profit can be updated (provided it's larger than the current amount)
    if (new_profit > movies[movie_index].profit) {
        movies[movie_index].profit = new_profit
    }
}

// Exports the neccesary modules
module.exports = {
    getMovies,
    deleteMovie,
    addMovie,
    search,
    update
}
