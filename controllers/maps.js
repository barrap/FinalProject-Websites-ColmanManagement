
const locationsService = require('../services/location');
const customersService = require('../services/customers');
var fs = require('fs');
var formidable = require('formidable');

const Alllocations = (req, res) => {

    // Checks if the user is logged in
    if (req.session.username != null) {

        // gets the user data
        const customer = customersService.getCustomer(req.session.username)
        customer.then(cust => {

            // Checks if the user exists
            if (cust) {

                const result = locationsService.getLocations()
                result.then(r => {

                    // Checks if the user is admin
                    if (cust.isAdmin == true) {
                        res.render("../views/locations-admin", { stores: Array.from(r) })
                    }

                    // user is not an admin so send to regular locations page
                    else {
                        res.render("../views/locations", { stores: Array.from(r) })
                    }
                })
            }

            // user doesn't exists so send to homepage
            else {
                res.redirect("/")
            }
        })
    }

    // user isn't logged in so send to homepage
    else {
        res.redirect("/")
    }

}

const addLocationPage = (req, res) => {
    data = {}
    data['status'] = ""
    // Checks if the users is logged in
    if (req.session.username != null) {

        // Gets the user data
        const customer = customersService.getCustomer(req.session.username)
        customer.then(cust => {

            // Checks if the user exists
            if (cust) {

                // Checks if the user is a admin
                if (cust.isAdmin == true) {
                    data['username'] = cust._id
                    res.render("../views/addLocation", { data: data })
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

// Function to upload JSON 
const upload = (req, res) => {

    // Checks if the users is logged in
    if (req.session.username != null) {

        // Gets the user data
        const customer = customersService.getCustomer(req.session.username)
        customer.then(cust => {


            // Checks if the user exists
            if (cust) {

                // Checks if the user is a admin
                if (cust.isAdmin == true) {
                    var form = new formidable.IncomingForm();
                    form.parse(req, function (err, fields, files) {
                        if (files.filetoupload.originalFilename != "")
                        {
                            // Read file content 
                            let rawdata = fs.readFileSync(files.filetoupload.filepath);
                            let json = JSON.parse(rawdata);
                            try {
                                // Upload the json to the DB
                                locationsService.uploadJson(json)
                            }
                            catch{
                                console.log("failed to upload json to server")
                            }
                            finally{

                                // Remove file from disk 
                                fs.unlinkSync(files.filetoupload.filepath);
                            }
                        }
                        res.redirect("/locations")
                    });
                }

                // The user isn't an admin so redirect to the main page
                else {
                    res.redirect("/main")
                }
            }

            // The user doesn't exists so redirects to the home page
            else {
                res.redirect("/")
            }
        })
    }

    // The user isn't logged in so redirects to the home page
    else {
        res.redirect("/")
    }
}

const deleteLocationPage = (req, res) => {

    // Checks if the user is logged in
    if (req.session.username != null) {

        // Gets the users data
        const customer = customersService.getCustomer(req.session.username)
        customer.then(cust => {

            // Checks if the user exists
            if (cust) {

                // Checks if user is admin
                if (cust.isAdmin == true) {

                    // Gets the city information
                    const cities_data = locationsService.getCities()
                    cities_data.then(cities => {
                        cities['username'] = cust._id
                        res.render("../views/deleteLocation", { cities: cities })
                    })
                }

                // User isn't an admin so redirects to main location page
                else {
                    res.redirect("/locations")
                }
            }

            // The user doesn't exists so redirects to homepage
            else {
                res.redirect("/")
            }
        })
    }

    // User isn't logged in so redirects to homepage
    else {
        res.redirect("/")
    }
}

const deleteLocation = (req, res) => {

    // Checks if the user is logged in
    if (req.session.username != null) {

        var city = req.body.city

        // Gets the users data
        const customer = customersService.getCustomer(req.session.username)
        customer.then(cust => {

            // Checks if the user exists
            if (cust) {

                // Checks if user is admin
                if (cust.isAdmin == true) {

                    // Tries and delete the city
                    const results = locationsService.deleteLocation(req.body.city)
                    results.then(results => {
                        res.redirect("/locations")
                    })
                }

                // User isn't an admin so redirects to main location page
                else {
                    res.redirect("/locations")
                }
            }

            // The user doesn't exists so redirects to homepage
            else {
                res.redirect("/")
            }
        })
    }

    // User isn't logged in so redirects to homepage
    else {
        res.redirect("/")
    }
}

// Exports all the function
module.exports = {
    Alllocations,
    addLocationPage,
    addLocation,
    deleteLocationPage,
    deleteLocation,
    upload
}