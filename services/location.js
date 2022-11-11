const location_db = require('../models/location')

const mongoose = require('mongoose');
mongoose.connect(process.env.CONNECTION_STRING)


// Return location by city
async function getLocationsByCity(city) {

    return await location_db.find({ city: city });
}

// Count locations
async function countLocations()
{
    const data = await location_db.count()
    return data;
}

// Function to add JSON
async function uploadJson(json) {
    await location_db.create(json, function (err, small) {
        if (err)
        {
            console.log(err)
            return;
        }
    });
}

// Return all locations
async function getLocations() {
    return await location_db.find({}, { _id: 0, Lat: 1, Len: 1 })
}
async function getCities() {
    return await location_db.find({}, { _id: 0, city: 1 }).sort({ city: 1 })
}

// Adds new location to the database 
async function addLocation(city, lat, len) {
    var location = new location_db({
        city: city,
        Lat: lat,
        Len: len,
    });
    return await location.save();
}

// Delete location by city
async function deleteLocation(city) {
    await location_db.deleteOne({ city: city });
}

module.exports = {
    getLocationsByCity,
    getLocations,
    getCities,
    addLocation,
    deleteLocation, 
    countLocations,
    uploadJson
};