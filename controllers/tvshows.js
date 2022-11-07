
// Import the neccesary modules 
const url = require("url")
const TVShowsService = require('../services/tvshow');
const CreditCardService = require('../services/creditCard');
const customersService = require("../services/customers");
const public_dir_path = "../public"


// Function to get the data on all the shows
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
                year = TVShowsService.countShowsByYear()
                year.then(y => {
                    for(i = 0; i<y.length; i++)
                    {
                        years.push(y[i]._id)
                    }
                    results['years'] = years
                })
                

                // Gets all genres
                genres = [];
                genreM = TVShowsService.countShowsByGenre()
                genreM.then(y => {
                    for(i = 0; i<y.length; i++)
                    {
                        for(j=0; j<y[i]._id.length; j++)
                        {
                            genres.push(y[i]._id[j])
                        }
                    }
                    results['genre'] = [...new Set(genres)]

                    // gets the data of all the shows in the DB
                    const shows = TVShowsService.getTvShows()
                    shows.then(r => {
                        results['username'] = cust._id
                        results['shows'] = r
                        // Checks if the user is a admin
                        if (cust.isAdmin == true) {
                            res.render("../views/tvshows-admin", { results: results });
                        }
                        else {
                            res.render("../views/tvshows", { results: results });
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

// Function to find one movie
function getTVShow(req, res) {

    const query = url.parse(req.url).query
    const tvshow = query.split("=")[1]
    TVshow_result = {}

    // Check if the user is logged in
    if (req.session.username != null) {

        // Gets the customer data
        const customer = customersService.getCustomer(req.session.username)
        customer.then(cust => {

            // Checks if the user exsits
            if (cust) {

                // Gets the data if the movie
                const result = TVShowsService.getTVShow(tvshow)

                result.then(r => {
                    TVshow_result['tvshow_det'] = r
                    TVshow_result['username'] = cust._id

                    // Checks if the user is admin
                    if (cust.isAdmin == true) {
                        res.render("../views/tvshow-admin", { tv: TVshow_result })
                    }
                    else {
                        res.render("../views/tvshow", { tv: TVshow_result })
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

// Function to delete a show
const deleteTvshow = (req, res) => {

    // Checks if the users is logged in
    if (req.session.username != null) {

        // Gets the user data
        const customer = customersService.getCustomer(req.session.username)
        customer.then(cust => {

            // Checks if the user exists
            if (cust) {

                // Checks if the user is a admin
                if (cust.isAdmin == true) {
                    const result = TVShowsService.deleteTvShow(req.body.tvshow_id)
                    result.then(r => {
                        res.redirect("/tvshows")
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
const addTVShow = (req, res) => {

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
                        const result = TVShowsService.addTvShow(req.body.title, req.body.title.split(" ").join(""), parseInt(req.body.year, 10), req.body.preview, parseInt(req.body.seasons, 10),
                            req.body.genre.split(","), req.body.link.replace("watch?v=", "embed/"), parseInt(req.body.cost, 10))
                        result.then(r => {
                            res.redirect("/tvshows")
                        })
                    }
                    catch (e) {
                        res.render("../views/addTVShow", { message: { status: "TV Show already exists" } })
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

// Function to get the addTVShow page
const addShowPage = (req, res) => {

    // Checks if the users is logged in
    if (req.session.username != null) {

        // Gets the user data
        const customer = customersService.getCustomer(req.session.username)
        customer.then(cust => {

            // Checks if the user exists
            if (cust) {

                // Checks if the user is a admin
                if (cust.isAdmin == true) {
                    res.render("../views/addTVShow", { message: { status: "" } })
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
const searchTVShows = (req, res) => {

    // Checks if the users is logged in
    if (req.session.username != null) {

        // Gets the user data
        const customer = customersService.getCustomer(req.session.username)
        customer.then(cust => {

            // Checks if the user exists
            if (cust) {

                // Checks if the is admin
                if (cust.isAdmin == true) {
                    res.render("searchTV-admin.ejs", { username: { username: cust._id } })
                }
                else {
                    res.render("searchTV.ejs", { username: { username: cust._id } })
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
                const result = TVShowsService.search(param, value)
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


// Function to update a show details
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
                    const result = TVShowsService.update(req.body.title, parseInt(req.body.year, 10), req.body.description, parseInt(req.body.seasons, 10),
                        req.body.types.split(","), req.body.link.replace("watch?v=", "embed/"), parseInt(req.body.cost, 10))
                    res.redirect("/tvshows")
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

    // Checks if the users is logged in
    if (req.session.username != null) {

        // Gets the user data
        const customer = customersService.getCustomer(req.session.username)
        customer.then(cust => {

            // Checks if the user exists
            if (cust) {
                res.render("addOrder.ejs", { username: { username: cust._id } })
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
                    const result = CreditCardService.addCard(req.body.cardNumber, req.session.username, req.body.date, req.body.secNum)
                    result.then(r => {
                        res.redirect("/movies")
                    })
                }
                catch (e) {
                    res.render("../views/addMovie", { message: { status: "Movie already exists" } })
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
                    res.redirect("/tvshows")
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
                const eps = query.split("+")[3]
                price_shows = TVShowsService.getTvShows()
                price_shows.then(y=>{
                    
                    if(year !="none")
                    {
                        t_shows=[]
                        for(i=0;i<y.length;i++)
                        {
                            if(y[i].year == year)
                            {
                                t_shows.push(y[i])
                            }
                        }
                        y=t_shows
                        
                    }
                    if(genre!="none")
                    {
                        t_shows=[]
                        for(i=0;i<y.length;i++)
                        {
                            for(j=0;j<y[i].type.length;j++)
                            {
                                if(y[i].type[j] == genre)
                                {
                                    t_shows.push(y[i])
                                }
                            }
                        }
                        
                        y=t_shows
                    }
                    /*t_shows=[]
                    for(i=0;i<y.length;i++)
                    {
                        console.log(y[i].description)
                        if(y[i].seasons <= eps)
                        {
                            t_shows.push(y[i])
                        }
                    }
                    
                    y=t_shows*/
                    t_shows=[]
                    for(i=0;i<y.length;i++)
                    {
                        if(y[i].price <= max_price)
                        {
                            t_shows.push(y[i])
                        }
                        
                    }
                    
                    y=t_shows
                    result = y
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
    getTVShow,
    deleteTvshow,
    addTVShow,
    addShowPage,
    searchTVShows,
    search,
    update,
    order,
    paying,
    upload,
    filter
};