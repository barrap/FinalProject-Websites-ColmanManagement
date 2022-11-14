const mongoose = require('mongoose');
const Schema = mongoose.Schema

const Movie = new Schema({
    _id: String,
    shortTitle: String,
    year: String,
    director: String,
    length: Number, 
    main_actors: Array,
    type: Array,
    preview: String,
    trailer: String,
    price: Number,
    imdb_id: String
})

module.exports = mongoose.model('Movie', Movie)