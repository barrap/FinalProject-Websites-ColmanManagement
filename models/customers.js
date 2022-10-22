const mongoose = require('mongoose');
const Schema = mongoose.Schema

const Customer = new Schema({
    _id: String,
    fullname: String,
    password: String,
    location: String,
    isAdmin: Boolean,
    phone: String,
    orders: Number
})

module.exports = mongoose.model('Customer', Customer)