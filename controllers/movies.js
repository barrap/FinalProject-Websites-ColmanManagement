
// Import the neccesary modules 
const url = require("url")
const MovieService = require('../services/movies');
const CreditCardService = require('../services/creditCard');
const customersService = require("../services/customers");
const public_dir_path = "../public"


// Function to get the data on all the movies
const findAll = (req, res) => {

    // Checks if the users is logged in
    if (req.session.username != null) {

        // Gets the user data 
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
                    results['years'] = years
                })
                

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
                    results['genre'] = [...new Set(genres)]
                })
                

                // Gets all director
                dirs = [];
                dir = MovieService.countMoviesByDirector()
                dir.then(y => {
                    for(i = 0; i<y.length; i++)
                    {
                        dirs.push(y[i]._id)
                    }
                    results['dir'] = dirs
                })
                

                // Gets all the movies
                const movies = MovieService.getMovies()
                movies.then(mov => {
                    results['movies'] = mov
                    // Gets the data of all the tv shows
                    
                    results['username'] = cust._id

                    // Checks if the user is admin
                    if (cust.isAdmin == true) {
                        res.render("../views/movies-admin", { results: results })
                    }

                    // The user is not an admin
                    else {
                        res.render("../views/movies", { results: results })
                    }
                
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

// Function to find one movie
function getMovie(req, res) {

    const query = url.parse(req.url).query
    const movie = query.split("=")[1]
    movie_result = {}

    // Check if the user is logged in
    if (req.session.username != null) {

        // Gets the customer data
        const customer = customersService.getCustomer(req.session.username)
        customer.then(cust => {

            // Checks if the user exsits
            if (cust) {

                // Gets the data if the movie
                const result = MovieService.getMovie(movie)

                result.then(r => {
                    movie_result['movie_det'] = r
                    movie_result['username'] = cust._id

                    // Checks if the user is admin
                    if (cust.isAdmin == true) {
                        res.render("../views/movie-admin", { movie: movie_result })
                    }
                    else {
                        res.render("../views/movie", { movie: movie_result })
                    }

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

// Function to delete a movie
const deleteMovie = (req, res) => {

    // Checks if the users is logged in
    if (req.session.username != null) {

        // Gets the user data
        const customer = customersService.getCustomer(req.session.username)
        customer.then(cust => {

            // Checks if the user exists
            if (cust) {

                // Checks if the user is a admin
                if (cust.isAdmin == true) {
                    const result = MovieService.deleteMovie(req.body.movie_id)
                    result.then(r => {
                        res.redirect("/movies")
                    })
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


// Function to add a movie to the DB
const addMovie = (req, res) => {

    // Checks if the users is logged in
    if (req.session.username != null) {

        // Gets the user data
        const customer = customersService.getCustomer(req.session.username)
        customer.then(cust => {

            // Checks if the user exists
            if (cust) {

                // Checks if the user is a admin
                if (cust.isAdmin == true) {
                    try {
                        const result = MovieService.addMovie(req.body.title, req.body.title.split(" ").join(""), parseInt(req.body.year, 10), req.body.director, parseInt(req.body.length, 10),
                            req.body.actors.split(","), req.body.genre.split(","), req.body.preview, req.body.link.replace("watch?v=", "embed/"), parseInt(req.body.cost, 10))
                        result.then(r => {
                            res.redirect("/movies")
                        })
                    }
                    catch (e) {
                        res.render("../views/addMovie", { message: { status: "Movie already exists" } })
                    }

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

// Function to get the addMovie page
const addMoviePage = (req, res) => {

    // Checks if the users is logged in
    if (req.session.username != null) {

        // Gets the user data
        const customer = customersService.getCustomer(req.session.username)
        customer.then(cust => {

            // Checks if the user exists
            if (cust) {

                // Checks if the user is a admin
                if (cust.isAdmin == true) {
                    res.render("../views/addMovie", { message: { status: "" } })
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
    else {

        // The user isn't logged in so redirects to the home page
        res.redirect("/")
    }
}


// Function to get the searchMovies page
const searchMovies = (req, res) => {

    // Checks if the users is logged in
    if (req.session.username != null) {

        // Gets the user data
        const customer = customersService.getCustomer(req.session.username)
        customer.then(cust => {

            // Checks if the user exists
            if (cust) {

                // Checks if the user is admin
                if (cust.isAdmin == true) {
                    res.render("searchMovies-admin.ejs", { username: { username: cust._id } })
                }
                else {
                    res.render("searchMovies.ejs", { username: { username: cust._id } })
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

// Function to search movies in the DB
const search = (req, res) => {

    // Checks if the users is logged in
    if (req.session.username != null) {

        // Gets the user data
        const customer = customersService.getCustomer(req.session.username)
        customer.then(cust => {

            // Checks if the user exists
            if (cust) {

                // Parse the get request to get both the parameters and the value
                const query = url.parse(req.url).query
                const param = query.split("=")[0]
                const value = query.split("=")[1]
                const result = MovieService.search(param, value)
                result.then(r => {
                    r['username'] = cust._id
                    res.json(r);
                })
            }
            else {

                // The user doesn't exists so redirects to the home page
                res.redirect("/")
            }
        })
    }
    else {

        // The user isn't logged in so redirects to the home page
        res.redirect("/")
    }
}


// Function to update a movie details
const update = (req, res) => {

    // Checks if the users is logged in
    if (req.session.username != null) {

        // Gets the user data
        const customer = customersService.getCustomer(req.session.username)
        customer.then(cust => {

            // Checks if the user exists
            if (cust) {

                // Checks if the user is a admin
                if (cust.isAdmin == true) {
                    MovieService.update(req.body.title, req.body.preview, req.body.director, parseInt(req.body.year, 10), parseInt(req.body.length, 10),
                        req.body.actors.split(","), req.body.genre.split(","), req.body.link.replace("watch?v=", "embed/"), parseInt(req.body.cost, 10))
                    res.redirect("/movies")
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

// Function to add order 
const order = (req, res) => {
    information = {}

    // Checks if the users is logged in
    if (req.session.username != null) {

        // Gets the user data
        const customer = customersService.getCustomer(req.session.username)
        customer.then(cust => {
            

            // Checks if the user exists
            if (cust) {
                cards = CreditCardService.getCreditCard(cust._id)
                cards.then(r =>{
                    information['username'] = cust._id
                    information['cards'] = r
                    res.render("addOrder.ejs", { info: information })
                }
                )
                
                
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

// Function to add payment 
const paying = (req, res) => {

    // Checks if the users is logged in
    if (req.session.username != null) {

        // Gets the user data
        const customer = customersService.getCustomer(req.session.username)
        customer.then(cust => {

            // Checks if the user exists
            if (cust) {
                try {
                    
                    customersService.addOrder(req.session.username)
                    if(CreditCardService.getCardByNumber(req.body.cardNumber))
                    {
                        res.redirect("/main")
                    }
                    else{
                        const result = CreditCardService.addCard(req.body.cardNumber, req.session.username, req.body.date, req.body.secNum)
                        result.then(r => {
                            res.redirect("/main")
                        })
                    }
                }
                catch (e) {
                    res.render("../views/main", { message: { status: "" } })
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

                    MovieService.uploadJson(req.data)
                    res.redirect("/movies")
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

const filter = (req, res) => {

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
                const dir = query.split("+")[3]
                const len = query.split("+")[4]
                price_movies = MovieService.search("cost",max_price)
                price_movies.then(y=>{
                    
                    if(year !="none")
                    {
                        t_movies=[]
                        for(i=0;i<y.length;i++)
                        {
                            if(y[i].year == year)
                            {
                                t_movies.push(y[i])
                            }
                        }
                        y=t_movies
                        console.log(y)
                    }
                    if(genre!="none")
                    {
                        t_movies=[]
                        for(i=0;i<y.length;i++)
                        {
                            for(j=0;j<y[i].type.length;j++)
                            {
                                if(y[i].type[j] == genre)
                                {
                                    t_movies.push(y[i])
                                }
                            }
                        }
                        y=t_movies
                    }
                    if(dir !="none")
                    {
                        t_movies=[]
                        for(i=0;i<y.length;i++)
                        {
                            if(y[i].director == dir)
                            {
                                t_movies.push(y[i])
                            }
                        }
                        y=t_movies
                    }
                    t_movies=[]
                    for(i=0;i<y.length;i++)
                    {
                        if(y[i].length <= len)
                        {
                            t_movies.push(y[i])
                        }
                    }

                    y=t_movies
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

// Exports the neccesary functions
module.exports = {
    findAll,
    getMovie,
    deleteMovie,
    addMovie,
    addMoviePage,
    searchMovies,
    search,
    update,
    order,
    paying,
    upload,
    filter
};