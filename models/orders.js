const { Int32 } = require('mongodb')
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const order = new Schema({
    total_price: Number,
    movies: Array,
    user_id: String,
    date: Date
})


module.exports = mongoose.model('orders', order)