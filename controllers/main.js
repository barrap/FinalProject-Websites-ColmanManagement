const TVShowsService = require('../services/tvshow');
const MovieService = require('../services/movies');
const customersService = require("../services/customers");
const url = require("url")


const filter = (req, res) => {

    // Checks if the users is logged in
    if (req.session.username != null) {
        console.log("dd")

        // Gets the user data
        const customer = customersService.getCustomer(req.session.username)
        customer.then(cust => {
            

            // Checks if the user exists
            if (cust) {
                // Parse the get request to get both the parameters and the value
                const query = url.parse(req.url).query
                const year1 = query.split("+")[0]
                const genre1 = query.split("+")[1]
                const max_price = query.split("+")[2]
                price_movies = MovieService.search("cost",max_price)
                price_movies.then(y=>{
                    t_movies=[]
                    if(year1!="none")
                    {
                        for(i=0;i<y.length;i++)
                        {
                            if(y[i].year == year1)
                            {
                                t_movies.push(y[i])
                            }
                        }
                        y=t_movies
                    }
                    t_movies1 =[]
                    if(genre1!="none")
                    {
                        for(i=0;i<y.length;i++)
                        {
                            for(j=0;j<y[i].type.length;j++)
                            {
                                if(y[i].type[j] == genre1)
                                {
                                    t_movies1.push(y[i])
                                }
                            }
                        }
                        y=t_movies1
                    }
                    result = y
                    console.log(result)
                    result['username'] = cust._id
                    console.log(result)
                    res.json(result);
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
                years = [];
                year = MovieService.countMoviesByYear()
                year.then(y => {
                    for(i = 0; i<y.length; i++)
                    {
                        years.push(y[i]._id)
                    }
                   
                })
                yearS = TVShowsService.countShowsByYear()
                yearS.then(y=>
                    {
                        for(i = 0; i<y.length; i++)
                        {
                            years.push(y[i]._id)
                        }
                })
                results['years'] = years

                // Gets all genres
                genres = [];
                genreM = MovieService.countMoviesByGenre()
                genreM.then(y => {
                    for(i = 0; i<y.length; i++)
                    {
                        for(j=0; j<y[i]._id.length; j++)
                        {
                            genres.push(y[i]._id[j])
                        }
                    }
                })
                genreS = TVShowsService.countShowsByGenre()
                genreS.then(y => {
                    for(i = 0; i<y.length; i++)
                    {
                        for(j=0; j<y[i]._id.length; j++)
                        {
                            genres.push(y[i]._id[j])
                        }
                    }
                    results['genre'] = [...new Set(genres)]
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