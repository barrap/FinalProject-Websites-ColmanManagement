const movies = require('../models/movies');
const customersService = require('../services/customers');
const moviesService = require('../services/movies');
const ordersService = require('../services/orders');
const locationService = require('../services/location');
const tvshowsService = require('../services/tvshow')


const GetData = (req, res) => {
    if (req.session.username != null)
    {
        // Get Customer Data
        const customer = customersService.getCustomer(req.session.username)
        customer.then(cust => {

            // verify that the customer is admin
            if (cust.isAdmin == true)
            {
                // Collect stats
                const numMovies = moviesService.countMovies()
                numMovies.then(amount_of_movies =>{
                const moviesByDirector = moviesService.countMoviesByDirector()
                moviesByDirector.then(movies_by_director=>{
                var movies_by_director_array = []
                movies_by_director.forEach(element=>movies_by_director_array.push([element["_id"], element["count"]]))
                console.log(JSON.stringify  (movies_by_director_array))
                const moviesByYear = moviesService.countMoviesByYear()
                moviesByYear.then(movies_by_year=>{
                    var movies_by_year_array = []
                    movies_by_year.forEach(element=>movies_by_year_array.push([element["_id"], element["count"]]))
                    console.log(JSON.stringify(movies_by_year_array))
                    const numUsers = customersService.countCustomers()
                    numUsers.then(amount_of_users => {
                        const numStores = locationService.countLocations()
                        numStores.then(amount_of_locations=>{
                        const numTvShows = tvshowsService.countTVShows()
                            numTvShows.then(amount_of_tvshows => {
                            res.render("../views/admin-stats", {data: 
                                {
                                    count_movies: amount_of_movies, 
                                    username: req.session.username,
                                    count_users: amount_of_users,
                                    count_locations: amount_of_locations,
                                    count_tvshows: amount_of_tvshows,
                                },
                                count_movies_by_year: Array.from(movies_by_year_array),
                                count_movies_by_director: Array.from(movies_by_director_array)
                                
                            })
                        })
                    })
                    })
                })
                })
            })

                // Users statistics 
                
            }
            else 
            {
                res.redirect("/")
            }
        })

    }
    else{
        res.redirect("/")
    }
}

module.exports = {GetData}




