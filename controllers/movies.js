
// Import the neccesary modules 
const url = require("url")
var fs = require('fs');
var formidable = require('formidable');
const MovieService = require('../services/movies');
const CreditCardService = require('../services/creditCard');
const customersService = require("../services/customers");
const twitterApi = require("twitter-api-v2").default;
const public_dir_path = "../public"
const axios = require("axios");

const client = new twitterApi({
    appKey:process.env.API_KEY,
    appSecret:process.env.API_SECRET,
    accessToken:process.env.ACCESS_TOKEN,
    accessSecret:process.env.ACCESS_SECRET,
    clientId:process.env.CLIENT_ID,
    clientSecret:process.env.CLIENT_SECRET
})

const rwClient = client.readWrite;

// Function to tweet
async function tweet(tweet)
{
    try{ 
        await rwClient.v1.tweet("Check out our new movie "+tweet+"!")       

    }
    catch(e)
    {
        console.error(e)
    }
}

// Function to get the data on all the movies
const findAll = async (req, res) => {
    // Checks if the users is logged in
    if (req.session.username != null) {
        
        // Gets the user data 
        const customer = customersService.getCustomer(req.session.username)
        customer.then(cust => {

            // Checks if the user exists
            if (cust) {

                // Gets all publishing years
                year = MovieService.getYears()
                year.then(y => {
                    results['years'] = y
                })


                // Gets all genres
                genres = [];
                genreM = MovieService.countMoviesByGenre()
                genreM.then(y => {
                    for (i = 0; i < y.length; i++) {
                        for (j = 0; j < y[i]._id.length; j++) {
                            genres.push(y[i]._id[j])
                        }
                    }
                    results['genre'] = [...new Set(genres)]
                })


                // Gets all director
                dir = MovieService.getDirectors()
                dir.then(y => {
                    results['dir'] = y
                })


                // Gets all the movies
                const movies = MovieService.getMovies()
                movies.then(mov => {
                    results['movies'] = mov
                    // Gets the data of all the tv shows
                    // for loop to 

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
    var movie = query.split("=")[1]
    movie = movie.replaceAll("%20","")
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

    var referer = req.rawHeaders[33].substring(21)

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
                        if (referer == "/main") {
                            res.redirect("/main")
                        }
                        else {
                            res.redirect("/movies")
                        }
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

// Get the movie's imdb id
async function getId(title)
    {
        id = ""
        const options = {
            method: 'GET',
            url: 'https://imdb8.p.rapidapi.com/title/v2/find',
            params: {title: title, limit: '20', sortArg: 'moviemeter,asc'},
            headers: {
              'X-RapidAPI-Key': 'ac1f79cbcbmsh9f4274bfdce4627p11dabcjsn17f24c92f5b3',
              'X-RapidAPI-Host': 'imdb8.p.rapidapi.com'
            }
          };
          
          axios.request(options).then(function (response) {
              id = (response.data.results[0].id);
              console.log(id)
              return id
          }).catch(function (error) {
              console.error(error);
          });
        
    }

function getRating(id)
{
    const data = null;
    rating=""
    id = id.split('/')
    rate_url = "https://imdb8.p.rapidapi.com/title/get-ratings?tconst="+id[2]

    const xhr = new XMLHttpRequest();
    xhr.withCredentials = true;

    xhr.addEventListener("readystatechange", function () {
        if (this.readyState === this.DONE) {
            rating = (JSON.parse(this.responseText).rating);
            return rating
        }
    });

    xhr.open("GET",rate_url );
    xhr.setRequestHeader("X-RapidAPI-Key", "ac1f79cbcbmsh9f4274bfdce4627p11dabcjsn17f24c92f5b3");
    xhr.setRequestHeader("X-RapidAPI-Host", "imdb8.p.rapidapi.com");

    xhr.send(data);
    
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
                        const options = {
                            method: 'GET',
                            url: 'https://imdb8.p.rapidapi.com/title/v2/find',
                            params: {title: req.body.title, limit: '20', sortArg: 'moviemeter,asc'},
                            headers: {
                              'X-RapidAPI-Key': 'ac1f79cbcbmsh9f4274bfdce4627p11dabcjsn17f24c92f5b3',
                              'X-RapidAPI-Host': 'imdb8.p.rapidapi.com'
                            }
                          };
                          
                          axios.request(options).then(function (response) {
                            id = (response.data.results[0].id);
                            id = id.split('/')
                              // add here a function to add the mdb id for the movie - also in add tv show
                            const result = MovieService.addMovie(req.body.title, req.body.title.split(" ").join(""), parseInt(req.body.year, 10), req.body.director, parseInt(req.body.length, 10),
                            req.body.actors.split(","), req.body.genre.split(","), req.body.preview, req.body.link.replace("watch?v=", "embed/"), parseInt(req.body.cost, 10),id[2])
                            result.then(r => {
                                tweet(req.body.title)
                                res.redirect("/movies")
                            })
                          }).catch(function (error) {
                                res.render("../views/addMovie", { message: { status: "Title does not exist" } })
                          });

                        
                    }
                    catch (e) {
                        console.log(e)
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

    var referer = req.rawHeaders[33].substring(21)

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
                    if (referer == "/main") {
                        res.redirect("/main")
                    }
                    else {
                        res.redirect("/movies")
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
                        if (files.filetoupload.originalFilename != "") {
                            // Read file content 
                            let rawdata = fs.readFileSync(files.filetoupload.filepath);
                            let json = JSON.parse(rawdata);
                            try {

                                // Upload the json to the DB
                                MovieService.uploadJson(json)
                            }
                            catch {
                                console.log("failed to upload json to server")
                            }
                            finally {

                                // Remove file from disk 
                                fs.unlinkSync(files.filetoupload.filepath);
                            }
                        }
                        res.redirect("/movies")
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
                const director = query.split("+")[3]
                const len = query.split("+")[4]

                if (year != "none" && genre != "none" && director != "none") {
                    const results = MovieService.getMoviesByYearAndGenreAndDirector(year, genre, director, max_price, len)
                    results.then(r => {
                        r['username'] = cust._id
                        res.json(r);
                    })
                }
                else if (year != "none" && genre != "none") {
                    const results = MovieService.getMoviesByYearAndGenre(year, genre, max_price, len)
                    results.then(r => {
                        r['username'] = cust._id
                        res.json(r);
                    })
                }
                else if (year != "none" && director != "none") {
                    const results = MovieService.getMoviesByYearAndDirector(year, director, max_price, len)
                    results.then(r => {
                        r['username'] = cust._id
                        res.json(r);
                    })
                }
                else if (genre != "none" && director != "none") {
                    const results = MovieService.getMoviesGenreAndDirector(genre, director, max_price, len)
                    results.then(r => {
                        r['username'] = cust._id
                        res.json(r);
                    })
                }
                else if (year != "none") {
                    const results = MovieService.getMoviesByYear(year, max_price, len)
                    results.then(r => {
                        r['username'] = cust._id
                        res.json(r);
                    })
                }
                else if (genre != "none") {
                    const results = MovieService.getMoviesByGenre(genre, max_price, len)
                    results.then(r => {
                        r['username'] = cust._id
                        res.json(r);
                    })
                }
                else {
                    const results = MovieService.getMoviesByDirector(director, max_price, len)
                    results.then(r => {
                        r['username'] = cust._id
                        res.json(r);
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

const allMovies = (req, res) => {

    // Checks that the user is signed in
    if (req.session.username != null) {

        // Gets the data of the user
        const customer = customersService.getCustomer(req.session.username)
        customer.then(cust => {

            // Checks that the user exists
            if (cust) {

                // Gets the movies data 
                const results = MovieService.getMovies()
                results.then(r => {
                    res.json(r)
                })
            }

            // User doesn't exist - redirects to main page
            else {
                res.redirect("/")
            }
        })
    }

    // User not signed in - redirects to main page
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
    upload,
    filter,
    allMovies
};