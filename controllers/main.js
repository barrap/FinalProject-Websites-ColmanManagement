const TVShowsService = require('../services/tvshow');
const MovieService = require('../services/movies');
const customersService = require("../services/customers");

function mainPage(req, res) {


    // Check if the user is logged in
    if (req.session.username != null) {
        results = {}

        // Gets the customer data
        const customer = customersService.getCustomer(req.session.username)
        customer.then(cust => {

            // Checks if the user exists
            if (cust) {

                // Gets all the movies
                const movies = MovieService.getMovies()
                movies.then(mov => {
                    results['movies'] = mov
                    // Gets the data of all the tv shows
                    const tv_shows = TVShowsService.getTvShows()
                    tv_shows.then(tv => {
                        results['shows'] = tv
                        results['username'] = cust._id

                        // Checks if the user is admin
                        if (cust.isAdmin == true) {
                            res.render("../views/main-admin", { results: results })
                        }

                        // The user is not an admin
                        else {
                            res.render("../views/main", { results: results })
                        }
                    })
                })
            }

            // The user doesn't exists
            else {
                res.redirect("/")
            }
        })
    }

    // The user isn't logged in
    else {
        res.redirect("/")
    }
}

module.exports = {
    mainPage
}