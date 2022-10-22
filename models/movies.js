const mongoose = require('mongoose');
const Schema = mongoose.Schema

const Movie = new Schema({
    _id: String,
    year: String,
    director: String,
    length: Number, 
    main_actors: Array,
    type: Array,
    preview: String,
    trailer: String,
    price: Number
})

module.exports = mongoose.model('Movie', Movie)