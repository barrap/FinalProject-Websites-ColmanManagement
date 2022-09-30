const mongoose = require('mongoose');
const Schema = mongoose.Schema

const Movie = new Schema({
    _id: String,
    preview: String,
    views: Number, 
    profit: Number,
    preimre_date: String,
    link: String,
    recommended: Boolean
})

module.exports = mongoose.model('Movie', Movie)