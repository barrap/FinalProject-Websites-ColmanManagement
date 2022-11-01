const TvShows = require('../models/tvshow')

const mongoose = require('mongoose');
mongoose.connect(process.env.CONNECTION_STRING)


// Function to get all the tv shows
async function getTvShows() {

    return await TvShows.find();
}

// Function to delete a tv show
async function deleteTvShow(tvshow_name) {
    await TvShows.deleteOne({ _id: tvshow_name })
}

// Function to add a tv show
function addTvShow(title, year, description, episodes, types, trailer, price) {

    // Define the new tv show
    var tvshow = new tvshow({
        _id: title,
        year: year,
        description: description,
        episodes: episodes,
        type: types,
        trailer: trailer,
        price: price

    })

    // Tries and save the tv show
    return tvshow.save();
}

// Function to search the array
async function search(param, value) {

    // Uses a switch according to the search parameter the user selected
    switch (param) {
        case "title":

            // Search in an uncase-sensetive way
            return await TvShows.find({ "_id": { "$regex": value, "$options": "i" } })
            break;
        case "year":
            return await TvShows.find({ "year": { "$gte": parseInt(value, 10) } })
            break;
        case "cost":
            return await TvShows.find({ "price": { "$gte": parseInt(value, 10) } })
            break;
        default:
            break;
    }
}

// Function to update data about the tvshow
async function update(title, new_year, new_episodes, new_description, new_trailer, new_cost) {
    // checks if a new year was provided
    if (new_year) {
        await TvShows.updateOne({ _id: title }, { year: new_year })
    }

    // checks if a new episodes was provided
    if (new_episodes) {
        await TvShows.updateOne({ _id: title }, { episodes: new_episodes })
    }
    
    // checks if a new description was provided
    if (new_description) {
        await TvShows.updateOne({ _id: title }, { description: new_description })
    }

    // checks if a new trailer was provided
    if (new_trailer) {
        await TvShows.updateOne({ _id: title }, { trailer: new_trailer })
    }

    // checks if a new cost was provided
    if (new_cost) {
        await TvShows.updateOne({ _id: title }, { price: new_cost })
    }
}

// Exports the neccesary modules
module.exports = {
    getTvShows,
    deleteTvShow,
    addTvShow,
    search,
    update
}
