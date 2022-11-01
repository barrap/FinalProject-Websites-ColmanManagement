const location_db = require('../models/location')

const mongoose = require('mongoose');
mongoose.connect(process.env.CONNECTION_STRING)


// Return location by city
async function getLocationsByCity(city) {

    return await location_db.find({ city: city });
}

// Return all locations
async function getLocations()
{
    return await location_db.find({},{_id:0, Lat:1, Len:1})
}

// Adds new location to the database 
async function addLocation(city, lat, len){
    const location = new location({
        city: city, 
        Lat: lat,
        Len: len, 
    });
    return await location.save();
}

// Delete location by city
async function deleteLocation(city)
{
    await location_db.deleteOne({ city: city });
}

module.exports = {
    getLocationsByCity,
    getLocations, 
    addLocation,
    deleteLocation
};