const { Int32 } = require('mongodb')
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const creditCard = new Schema({
    _id: String,
    _username: String,
    _exp_date: Date,
    _digits: Number
})


module.exports = mongoose.model('creditCard', creditCard)