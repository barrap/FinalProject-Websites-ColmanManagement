const { Int32 } = require('mongodb')
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const creditCard = new Schema({
    _card_number: String,
    _owner_id: String,
    _exp_date: Date,
    _digits: Number
})


module.exports = mongoose.model('creditCard', creditCard)