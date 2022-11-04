
const locationsService = require('../services/location');
const customersService = require('../services/customers')

const Alllocations = (req, res) => {
    results = {}
    // Checks if the user is logged in
    if (req.session.username != null) {

        // gets the user data
        const customer = customersService.getCustomer(req.session.username)
        customer.then(cust => {

            // Checks if the user exists
            if (cust) {

                const result = locationsService.getLocations()
                result.then(r => {
                    res.render("../views/locations", { stores: Array.from(r) })
                })
            }
            else {
                res.redirect("/")
            }
        })

    }
    else {
        res.redirect("/")
    }

}

const addLocationPage = (req, res) => {

    // Checks if the users is logged in
    if (req.session.username != null) {

        // Gets the user data
        const customer = customersService.getCustomer(req.session.username)
        customer.then(cust => {

            // Checks if the user exists
            if (cust) {

                // Checks if the user is a admin
                if (cust.isAdmin == true) {
                    res.render("../views/addLocation", { message: { status: "" } })
                }

                // The user isn't an admin so redirect to the main page
                else {
                    res.redirect("/locations")
                }
            }

            // The user doesn't exists so redirects to the home page
            else {
                res.redirect("/")
            }
        })
    }
    else {

        // The user isn't logged in so redirects to the home page
        res.redirect("/")
    }
}

const addLocation = (req, res) => {
    // Checks if the users is logged in
    if (req.session.username != null) {

        // Gets the user data
        const customer = customersService.getCustomer(req.session.username)
        customer.then(cust => {

            // Checks if the user exists
            if (cust) {

                // Checks if the user is a admin
                if (cust.isAdmin == true) {

                    // Adds the new location
                    const result = locationsService.addLocation(req.body.city, req.body.latitude, req.body.longitude)
                    result.then(r => {
                        res.redirect("/locations")
                    })
                }

                // The user isn't an admin so redirect to the main page
                else {
                    res.redirect("/locations")
                }
            }

            // The user doesn't exists so redirects to the home page
            else {
                res.redirect("/")
            }
        })
    }
    else {

        // The user isn't logged in so redirects to the home page
        res.redirect("/")
    }
}

// Exports all the function
module.exports = {
    Alllocations,
    addLocationPage,
    addLocation
}