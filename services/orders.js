const creditCard = require('../models/orders')

const mongoose = require('mongoose');


// Return all orders by userID
async function getOrders(_user_id) {

    return await order.find({ user_id: _user_id });
}

// Adds new order to the database 
async function addOrder(_total_price, _movies, _user_id, _date){
    const order = new order({
        total_price: _total_price, 
        movies: _movies,
        user_id: _user_id, 
        date: _date
    })

    // Tries and save the new card
    return await order.save()
}