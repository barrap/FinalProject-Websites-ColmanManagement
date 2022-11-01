const { Int32 } = require('mongodb')
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const tvshow = new Schema({
    _id: String,  // name of the tv show
    description: String,
    year: String, 
    episodes: Number, 
    type: Array,
    trailer: String,
    price: Number
});

module.exports = mongoose.model('tvshow', tvshow)