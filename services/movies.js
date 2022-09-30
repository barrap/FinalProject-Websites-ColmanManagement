const Movie = require('../models/movies')

const mongoose = require('mongoose');
mongoose.connect(process.env.CONNECTION_STRING)


// Function to get all the movies
async function getMovies() {

    return await Movie.find();
}

// Function to delete a movie
async function deleteMovie(id) {
    await Movie.deleteOne({_id: id})
}

// Function to add a movie
function addMovie(title, preview, views, profit, preimre_date, recommended, link) {

    var movie = {}
    // Check if the movie is recommended and add it accordingly
    if (recommended == "true") {
        movie = new Movie({
            _id: title,
            preview: preview,
            views: views,
            profit: profit,
            preimre_date: preimre_date,
            link: link,
            recommended: true

        })
    }
    else {
        movie = new Movie({
            _id: title,
            synopsis: preview,
            views: views,
            profit: profit,
            date: preimre_date,
            link: link,
            recommended: false

        })
    }
    return movie.save();
}

// Function to search the array
async function search(param, value) {

    // Uses a switch according to the search parameter the user selected
    switch (param) {
        case "title":
            return await Movie.find({"_id": {"$regex": value, "$options": "i"}})
            break;
        case "preview":
            return await Movie.find({"preview": {"$regex": value, "$options": "i"}})
        case "views":
            return await Movie.find({"views": {"$gte": parseInt(value, 10)}})
        case "profit":
            return await Movie.find({"profit": {"$gte": parseInt(value, 10)}})
        case "date":
            return await Movie.find({"preimre_date": {"$regex": value, "$options": "i"}})
        case "recommended":
            return await Movie.find({"recommended": (value == "yes") ? true : false})
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
