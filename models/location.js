const { Int32 } = require('mongodb')
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const location = new Schema({
    city: String, 
    Lat: Number, 
    Len: Number
});

module.exports = mongoose.model('location', location)