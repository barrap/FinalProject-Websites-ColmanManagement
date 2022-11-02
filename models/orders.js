const { Int32 } = require('mongodb')
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const order = new Schema({
    total_price: Number,
    movies: Array,
    user_id: String,
    year: Number,
    month: Number, 
    day: Number
})


module.exports = mongoose.model('orders', order)