
const locationsService = require('../services/location');

const Alllocations = (req, res) => {

    // Checks if the user is logged in
    if (req.session.username != null) {
        console.log("call to get locations");
        const result = locationsService.getLocations()
        result.then(
            r => {
                res.render("../views/locations", { stores: Array.from(r) })
            })
    }
    else {
        res.redirect("/")
    }

}

// Exports all the function
module.exports = { Alllocations }