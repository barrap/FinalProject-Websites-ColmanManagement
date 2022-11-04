const { Int32 } = require('mongodb')
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const tvshow = new Schema({
    _id: String,  // name of the tv show
    shortTitle: String,
    description: String,
    year: String,
    seasons: Number,
    type: Array,
    trailer: String,
    price: Number
});

module.exports = mongoose.model('tvshow', tvshow)