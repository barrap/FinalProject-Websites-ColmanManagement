
const locationsService = require('../services/location');
const MovieService = require('../services/customers');


const Alllocations = (req, res) => {
    console.log("call to get locations");
    const result = locationsService.getLocations()
    //const result = MovieService.getAllCustomers();
    result.then( 
        r=> {
            res.render("../views/locations", {stores: Array.from(r)})
        })
}

// Exports all the function
module.exports = { Alllocations }