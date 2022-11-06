const TVShowsService = require('../services/tvshow');
const MovieService = require('../services/movies');
const customersService = require("../services/customers");


const filter = (req, res) => {
    information = {}

    // Checks if the users is logged in
    if (req.session.username != null) {

        // Gets the user data
        const customer = customersService.getCustomer(req.session.username)
        customer.then(cust => {
            

            // Checks if the user exists
            if (cust) {
                // Gets all publishing years
                year = MovieService.countMoviesByYear()
                year.then(y => {
                    years = [];
                    for(i = 0; i<y.length; i++)
                    {
                        years.push(y[i]._id)
                    }
                    results['years'] = years
                })

                // Gets all genres
                genre = MovieService.countMoviesByGenre()
                genre.then(y => {
                    genres = [];
                    for(i = 0; i<y.length; i++)
                    {
                        console.log(y[i]._id)
                    }
                    
                })

                 // Gets all prices
                 price = MovieService.countMoviesByPrice()
                 price.then(y => {
                     prices = [];
                     for(i = 0; i<y.length; i++)
                     {
                         prices.push(y[i]._id)
                     }
                     results['prices'] = prices
                 })

                 // Gets all the movies

                 if(req.body.Publishing_year != 'None')
                 {
                    console.log((req.body.Publishing_year).slice(0, -1))
                     movies = MovieService.search("year",req.body.Publishing_year.slice(0, -1))
                 }

                 else
                 {
                    movies  = MovieService.getMovies()
                 }

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

function mainPage(req, res) {


    // Check if the user is logged in
    if (req.session.username != null) {
        results = {}

        // Gets the customer data
        const customer = customersService.getCustomer(req.session.username)
        customer.then(cust => {

            // Checks if the user exists
            if (cust) {

                // Gets all publishing years
                year = MovieService.countMoviesByYear()
                year.then(y => {
                    years = [];
                    for(i = 0; i<y.length; i++)
                    {
                        years.push(y[i]._id)
                    }
                    results['years'] = years
                })

                // Gets all genres
                genre = MovieService.countMoviesByGenre()
                genre.then(y => {
                    genres = [];
                    for(i = 0; i<y.length; i++)
                    {
                        console.log(y[i]._id)
                    }
                    
                })

                 // Gets all prices
                 price = MovieService.countMoviesByPrice()
                 price.then(y => {
                     prices = [];
                     for(i = 0; i<y.length; i++)
                     {
                         prices.push(y[i]._id)
                     }
                     results['prices'] = prices
                 })
               
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
    mainPage,
    filter
}