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
        { $sort: { year: 1 } }
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
    ]).limit(5);
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
function addMovie(title, shortTitle, year, director, length, main_actors, types, preview, trailer, price, imdb_id) {
    new_types = []
    new_types.push(types[0])
    for (var i = 1; i < types.length; i++) {
        new_types.push(types[i].replace(" ", ""))
    }

    new_actors = []
    new_actors.push(main_actors[0])
    for (var i = 1; i < main_actors.length; i++) {
        new_actors.push(main_actors[i].replace(" ", ""))
    }

    // Define the new movie
    var movie = new Movie({
        _id: title,
        shortTitle: shortTitle,
        year: year,
        director: director,
        length: length,
        main_actors: new_actors,
        type: new_types,
        preview: preview,
        trailer: trailer,
        price: price,
        imdb_id: imdb_id

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
            return await Movie.find({ "_id": { "$regex": value, "$options": "i" } }).sort({ _id: 1 })
            break;
        case "director":

            // Search in an uncase-sensetive way
            return await Movie.find({ "director": { "$regex": value, "$options": "i" } }).sort({ _id: 1 })
            break;
        case "year":
            return await Movie.find({ "year": parseInt(value, 10) }).sort({ _id: 1 })
            break;
        case "length":
            return await Movie.find({ "length": { "$gte": parseInt(value, 10) } }).sort({ _id: 1 })
            break;
        case "cost":
            return await Movie.find({ "price": { "$gte": parseInt(value, 10) } }).sort({ _id: 1 })
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
    await Movie.create(json, function (err, small) {
        if (err) return;
    });
}



async function getMoviesByYearAndGenreAndDirector(year, genre, director, max_price, len) {
    return await Movie.find({ $and: [{ "year": year }, { "type": { $in: [genre] } }, { "director": director }, { "price": { "$lte": parseInt(max_price, 10) } }, { "length": { "$lte": parseInt(len, 10) } }] })
}

async function getMoviesByYearAndGenre(year, genre, max_price, len = 0) {
    if (len) {
        return await Movie.find({ $and: [{ "year": year }, { "type": { $in: [genre] } }, { "price": { "$lte": parseInt(max_price, 10) } }, { "length": { "$lte": parseInt(len, 10) } }] })
    }
    else {
        return await Movie.find({ $and: [{ "year": year }, { "type": { $in: [genre] } }, { "price": { "$lte": parseInt(max_price, 10) } }] })
    }

}

async function getMoviesByYearAndDirector(year, director, max_price, len) {
    return await Movie.find({ $and: [{ "year": year }, { "director": director }, { "price": { "$lte": parseInt(max_price, 10) } }, { "length": { "$lte": parseInt(len, 10) } }] })
}

async function getMoviesGenreAndDirector(genre, director, max_price, len) {
    return await Movie.find({ $and: [{ "type": { $in: [genre] } }, { "director": director }, { "price": { "$lte": parseInt(max_price, 10) } }, { "length": { "$lte": parseInt(len, 10) } }] })
}

async function getMoviesByYear(year, max_price, len = 0) {
    if (len) {
        return await Movie.find({ $and: [{ "year": year }, { "price": { "$lte": parseInt(max_price, 10) } }, { "length": { "$lte": parseInt(len, 10) } }] })
    }
    else {
        return await Movie.find({ $and: [{ "year": year }, { "price": { "$lte": parseInt(max_price, 10) } }] })
    }

}

async function getMoviesByGenre(genre, max_price, len = 0) {
    if (len) {
        return await Movie.find({ $and: [{ "type": { $in: [genre] } }, { "price": { "$lte": parseInt(max_price, 10) } }, { "length": { "$lte": parseInt(len, 10) } }] })
    }
    else {
        return await Movie.find({ $and: [{ "type": { $in: [genre] } }, { "price": { "$lte": parseInt(max_price, 10) } }] })
    }

}

async function getMoviesByDirector(director, max_price, len) {
    return await Movie.find({ $and: [{ "director": director.replace("%20", " ") }, { "price": { "$lte": parseInt(max_price, 10) } }, { "length": { "$lte": parseInt(len, 10) } }] })
}

async function getYears() {
    return await Movie.find({}, { _id: 0, year: 1 }).distinct('year')
}

async function getDirectors() {
    return await Movie.find({}, { _id: 0, director: 1 }).distinct('director')
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
    countMoviesByPrice,
    getMoviesByYearAndGenreAndDirector,
    getMoviesByYearAndGenre,
    getMoviesByYearAndDirector,
    getMoviesGenreAndDirector,
    getMoviesByYear,
    getMoviesByGenre,
    getMoviesByDirector,
    getYears,
    getDirectors
}
