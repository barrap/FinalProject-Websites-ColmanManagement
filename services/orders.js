const Order = require('../models/orders')

const mongoose = require('mongoose');
mongoose.connect(process.env.CONNECTION_STRING)

// Count amount of orders by month
async function countOrderByMonth()
{
    const data = await Order.aggregate([
        {
          $group: {
            _id: {
                month: "$month",
                year: "$year",
              },
            count: { $sum: 1} // this means that the count will increment by 1
          }
        }
      ]);
    return data;
}

// Count amount of orders by month
async function countOrderPriceByMonth()
{
    const data = await Order.aggregate([
        {
          $group: {
            _id: {
                month: "$month",
                year: "$year",
              },
            count: { $sum: "$total_price"} // this means that the count will increment by 1
          }
        }
      ]);
    return data;
}

// Return all orders by userID
async function getOrdersByUser(_user_id) {

    return await Order.find({ user_id: _user_id });
}

// Adds new order to the database 
async function addOrder(_total_price, _movies, _user_id, _year, _month, _day){
    const order = new order({
        total_price: _total_price, 
        movies: _movies,
        user_id: _user_id, 
        year: _year,
        month: _month, 
        day: _day
    })

    // Tries and save the new card
    return await order.save()
}

module.exports = {
    getOrdersByUser,
    addOrder,
    countOrderByMonth,
    countOrderPriceByMonth
}