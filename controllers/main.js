const TVShowsService = require('../services/tvshow');
const MovieService = require('../services/movies');
const customersService = require("../services/customers");
const url = require("url")

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
                years = [];
                movieYear = MovieService.getYears()
                movieYear.then(movieYear => {
                    tvYears = TVShowsService.getYears()
                    tvYears.then(tvYear => {
                        var temp_years = movieYear.concat(tvYear)
                        years = temp_years.filter((item, pos) => temp_years.indexOf(item) === pos).sort()
                        results['years'] = years
                    })
                })

                // Gets all genres
                genres = [];
                movie_genres = [];
                genreM = MovieService.countMoviesByGenre()
                genreM.then(y => {
                    for (i = 0; i < y.length; i++) {
                        for (j = 0; j < y[i]._id.length; j++) {
                            movie_genres.push(y[i]._id[j])
                        }
                    }
                })
                tv_genres = []
                genreS = TVShowsService.countShowsByGenre()
                genreS.then(y => {
                    for (i = 0; i < y.length; i++) {
                        for (j = 0; j < y[i]._id.length; j++) {
                            tv_genres.push(y[i]._id[j])
                        }
                    }
                    temp_genres = movie_genres.concat(tv_genres)
                    genres = temp_genres.filter((item, pos) => temp_genres.indexOf(item) === pos).sort()

                    results['genre'] = genres
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

const filter = (req, res) => {
    data = {}

    // Checks if the users is logged in
    if (req.session.username != null) {

        // Gets the user data
        const customer = customersService.getCustomer(req.session.username)
        customer.then(cust => {


            // Checks if the user exists
            if (cust) {
                // Parse the get request to get both the parameters and the value
                const query = url.parse(req.url).query
                const year = query.split("+")[0]
                const genre = query.split("+")[1]
                const max_price = query.split("+")[2]
                /* const eps = query.split("+")[3] */

                if (year != "none" && genre != "none") {
                    const tvs = TVShowsService.getShowsByYearAndGenre(year, genre, max_price)
                    tvs.then(tv => {
                        data['tv'] = tv
                        const movies = MovieService.getMoviesByYearAndGenre(year, genre, max_price)
                        movies.then(movie => {
                            data['movies'] = movie
                            data['username'] = cust._id
                            res.json(data);
                        })

                    })
                }
                else if (year != "none") {
                    const tvs = TVShowsService.getShowsByYear(year, max_price)
                    tvs.then(tv => {
                        data['tv'] = tv
                        const movies = MovieService.getMoviesByYear(year, max_price)
                        movies.then(movie => {
                            data['movies'] = movie
                            data['username'] = cust._id
                            res.json(data);
                        })

                    })
                }
                else if (genre != "none") {
                    const tvs = TVShowsService.getShowsGenre(genre, max_price)
                    tvs.then(tv => {
                        data['tv'] = tv
                        const movies = MovieService.getMoviesByGenre(genre, max_price)
                        movies.then(movie => {
                            data['movies'] = movie
                            data['username'] = cust._id
                            res.json(data);
                        })

                    })
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


const findAll = (req, res) => {
    data = {}

    // Checks if the users is logged in
    if (req.session.username != null) {

        // Gets the user data
        const customer = customersService.getCustomer(req.session.username)
        customer.then(cust => {


            // Checks if the user exists
            if (cust) {
                const tvs = TVShowsService.getTvShows()
                tvs.then(tv => {
                    data['tv'] = tv
                    const movies = MovieService.getMovies()
                    movies.then(movie => {
                        data['movies'] = movie
                        data['username'] = cust._id
                        res.json(data);

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

const about = (req, res) => {

    // Checks if the user is logged in
    if (req.session.username != null) {

        // Gets the user data
        const customer = customersService.getCustomer(req.session.username)
        customer.then(cust => {

            // Checks if the user exists
            if (cust) {

                // Checks if the user is admin
                if (cust.isAdmin == true) {
                    res.render("../views/aboutUs-admin", { username: { username: cust._id } })
                }

                // User is not an admin
                else {
                    res.render("../views/aboutUs", { username: { username: cust._id } })
                }
            }

            // The user doesn't exists - redirects to the homepage
            else {
                res.redirect("/")
            }
        })
    }

    // User isn't logged in - redirects to the homepage
    else {
        res.redirect("/")
    }
}

module.exports = {
    mainPage,
    filter,
    findAll,
    about
}