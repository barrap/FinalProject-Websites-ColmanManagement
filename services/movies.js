const Movie = require('../models/movies')

const mongoose = require('mongoose');
mongoose.connect(process.env.CONNECTION_STRING)


// Count movies group by year
async function countMoviesByYear() {
    const data = await Movie.aggregate([
        {
            $group: {
                _id: '$year',
                count: { $sum: 1 } // this means that the count will increment by 1
            }
        },
        {$sort: {year: 1}}
    ])

    return data;
}

// Count movies group by genre
async function countMoviesByGenre() {
    const data = await Movie.aggregate([
        {
            $group: {
                _id: '$type',
                count: { $sum: 1 } // this means that the count will increment by 1
            }
        }
    ]);
    return data;
}

// Count movies group by price
async function countMoviesByPrice() {
    const data = await Movie.aggregate([
        {
            $group: {
                _id: '$price',
                count: { $sum: 1 } // this means that the count will increment by 1
            }
        }
    ]);
    return data;
}



// Count movies group by director
async function countMoviesByDirector() {
    const data = await Movie.aggregate([
        {
            $group: {
                _id: '$director',
                count: { $sum: 1 } // this means that the count will increment by 1
            }
        }
    ]);
    return data;
}

// Count movies
async function countMovies() {
    const data = await Movie.count()
    return data;
}

// Function to get all the movies
async function getMovies() {

    return await Movie.find().sort({ _id: 1 });
}

async function getMovie(movie) {
    return await Movie.find({ shortTitle: movie })
}

// Function to delete a movie
async function deleteMovie(id) {
    await Movie.deleteOne({ _id: id })
}

// Function to add a movie
function addMovie(title, shortTitle, year, director, length, main_actors, types, preview, trailer, price) {

    // Define the new movie
    var movie = new Movie({
        _id: title,
        shortTitle: shortTitle,
        year: year,
        director: director,
        length: length,
        main_actors: main_actors,
        type: types,
        preview: preview,
        trailer: trailer,
        price: price

    })

    // Tries and save the movie
    return movie.save();
}

// Function to search the array
async function search(param, value) {

    // Uses a switch according to the search parameter the user selected
    switch (param) {
        case "title":

            // Search in an uncase-sensetive way
            return await Movie.find({ "_id": { "$regex": value, "$options": "i" } })
            break;
        case "director":

            // Search in an uncase-sensetive way
            return await Movie.find({ "director": { "$regex": value, "$options": "i" } })
            break;
        case "year":
            return await Movie.find({ "year": parseInt(value, 10) })
            break;
        case "length":
            return await Movie.find({ "length": { "$gte": parseInt(value, 10) } })
            break;
        case "cost":
            return await Movie.find({ "cost": { "$gte": parseInt(value, 10) } })
            break;
        default:
            break;
    }
}

// Function to update data about the movie
async function update(title, new_preview, new_director, new_year, new_length, new_actors, new_genre, new_trailer, new_cost) {

    // checks if a new synopsis was provided
    if (new_preview) {
        await Movie.updateOne({ _id: title }, { preview: new_preview })
    }

    // checks if a new director was provided
    if (new_director) {
        await Movie.updateOne({ _id: title }, { director: new_director })
    }

    // checks if a new year was provided
    if (new_year) {
        await Movie.updateOne({ _id: title }, { year: new_year })
    }

    // checks if a new length was provided
    if (new_length) {
        await Movie.updateOne({ _id: title }, { length: new_length })
    }

    // checks if a new actors were provided
    if (new_actors[0] != '') {
        await Movie.updateOne({ _id: title }, { main_actors: new_actors })
    }

    // checks if a new genres were provided
    if (new_genre[0] != '') {
        await Movie.updateOne({ _id: title }, { type: new_genre })
    }

    // checks if a new trailer was provided
    if (new_trailer) {
        await Movie.updateOne({ _id: title }, { trailer: new_trailer })
    }

    // checks if a new cost was provided
    if (new_cost) {
        await Movie.updateOne({ _id: title }, { price: new_cost })
    }
}

// Function to add JSON
async function uploadJson(json) {
    await Movie.create(json)
}

// Exports the neccesary modules
module.exports = {
    getMovies,
    getMovie,
    deleteMovie,
    addMovie,
    search,
    update,
    countMoviesByYear,
    countMovies,
    countMoviesByDirector,
    uploadJson,
    countMoviesByGenre,
    countMoviesByPrice
}
