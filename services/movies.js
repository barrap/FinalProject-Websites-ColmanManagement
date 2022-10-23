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


// Function to update data about the movie
async function update(title, new_preview, new_director, new_year, new_length, new_actors, new_genre, new_trailer, new_cost) {

    if (new_preview) {
        await Movie.updateOne({_id: title}, {preview: new_preview})
    }
    
    if (new_director) {
        await Movie.updateOne({_id: title}, {director: new_director})
    }

    if (new_year) {
        await Movie.updateOne({_id: title}, {year: new_year})
    }

    if (new_length) {
        await Movie.updateOne({_id: title}, {length: new_length})
    }

    if (new_actors[0] != '') {
        await Movie.updateOne({_id: title}, {main_actors: new_actors})
    }

    if (new_genre[0] != '') {
        await Movie.updateOne({_id: title}, {type: new_genre})
    }

    if (new_trailer) {
        await Movie.updateOne({_id: title}, {trailer: new_trailer})
    }

    if (new_cost) {
        await Movie.updateOne({_id: title}, {price: new_cost})
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
