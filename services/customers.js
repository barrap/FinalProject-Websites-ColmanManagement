const Customer = require("../models/customers");
const crypto = require('crypto');

async function login(username, password) {
    const customer = await Customer.findOne({ _id: username });
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

async function deleteCustomer(username) {
    await Customer.deleteOne({ _id: username })
}

async function getAllCustomers() {
    return await Customer.find().sort({ _id: 1 })
}

async function updateAdmin(username, val) {

    await Customer.updateOne({ _id: username }, { isAdmin: val })
}

async function getCustomer(username) {
    return await Customer.findOne({ _id: username })
}

async function update(username, new_phone, new_location, new_password) {
    if (new_phone) {
        await Customer.updateOne({ _id: username }, { phone: new_phone })
    }
    if (new_location) {
        await Customer.updateOne({ _id: username }, { location: new_location })
    }
    if (new_password) {
        var new_hashed_password = crypto.pbkdf2Sync(new_password, "", 1000, 64, `sha512`).toString(`hex`);
        await Customer.updateOne({ _id: username }, { password: new_hashed_password })
    }
}

module.exports = {
    login,
    register,
    deleteCustomer,
    getAllCustomers,
    updateAdmin,
    getCustomer,
    update
}