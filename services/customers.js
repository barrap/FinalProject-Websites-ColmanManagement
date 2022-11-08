const Customer = require("../models/customers");
const crypto = require('crypto');

// Function to add order
async function addOrder(username)
{
    // Tries to find the customer by the username
    const cust = await Customer.findOne({ _id: username })
    order = parseInt(cust.orders)
    order = order+1

    await Customer.updateOne({ _id: username }, { orders: order })
}

// Function to login to the store
async function login(username) {

    // Tries to find the customer by the username
    const customer = await Customer.findOne({ _id: username });

    // Returns the customer
    return customer
}

// Count customers
async function countCustomers()
{
    const data = await Customer.count()
    return data;
}

// Count customers by location
async function countCustomersByLocation()
{
    const data = await Customer.aggregate([
        {
          $group: {
            _id: '$location',
            count: { $sum: 1 } // this means that the count will increment by 1
          }
        }
      ]);
    return data;
}

// Function to register a new customer
async function register(fullname, username, password, location, isAdmin, phone) {

    // Creates the hashed password
    var hashed_password = crypto.pbkdf2Sync(password, "", 1000, 64, `sha512`).toString(`hex`);

    // Define the new user
    const customer = new Customer({
        _id: username,
        fullname: fullname,
        password: hashed_password,
        location: location,
        isAdmin: isAdmin,
        phone: phone,
        orders: 0
    });

    // Tries and save the new user
    return await customer.save()
}


// Function to delete a customer
async function deleteCustomer(username) {
    await Customer.deleteOne({ _id: username })
}


// Function to get the data on all the customer
async function getAllCustomers() {

    // Sorts the Customer by thier username
    return await Customer.find().sort({ isAdmin: -1 })
}

// Function to change the isAdmin property of a customer
async function updateAdmin(username, val) {

    await Customer.updateOne({ _id: username }, { isAdmin: val })
}

// Function to get the data about one customer
async function getCustomer(username) {
    return await Customer.findOne({ _id: username })
}


// Function to update a customer details
async function update(username, new_phone, new_location, new_password) {

    // Gets the customer data
    const customer = await Customer.findOne({ _id: username })
    
    // checks if a new phone number was provided
    if (new_phone) {
        await Customer.updateOne({ _id: username }, { phone: new_phone })
    }

    // Checks if a new location was provided
    if (new_location != customer.location) {
        await Customer.updateOne({ _id: username }, { location: new_location })
    }

    // Checks if a new password was provided
    if (new_password) {

        // Created the new hashed password
        var new_hashed_password = crypto.pbkdf2Sync(new_password, "", 1000, 64, `sha512`).toString(`hex`);
        await Customer.updateOne({ _id: username }, { password: new_hashed_password })
    }
}

// Exports all the function
module.exports = {
    login,
    register,
    deleteCustomer,
    getAllCustomers,
    updateAdmin,
    getCustomer,
    update,
    countCustomersByLocation,
    countCustomers,
    addOrder
}