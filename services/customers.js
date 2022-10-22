const Customer = require("../models/customers");
const crypto = require('crypto');

async function login(username, password) {
    const customer = await Customer.findOne({ _id: username});
    return customer
}

async function register(fullname, username, password, location, isAdmin, phone) {
    var hashed_password = crypto.pbkdf2Sync(password, "", 1000, 64, `sha512`).toString(`hex`);
    const customer = new Customer({
        _id: username,
        fullname: fullname,
        password: hashed_password,
        location: location,
        isAdmin: isAdmin,
        phone: phone,
        orders: 0
    });

    return await customer.save()
}

module.exports = { login, register }