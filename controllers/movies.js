
// Import the neccesary modules 
const url = require("url")
const MovieService = require('../services/movies');

const findAll = (req, res) => {

    if(req.session.username != null) {
        const result = MovieService.getMovies()
        result.then(r => {
            res.render("../views/movies", { movies: r });
        })
    }
    else {
        res.redirect("/")
    }

}
const deleteMovie = (req, res) => {
    const result = MovieService.deleteMovie(req.body.movie_id)
    result.then(r => {
        res.redirect("/movies")
    })

}

const addMovie = (req, res) => {

    const result = MovieService.addMovie(req.body.title, parseInt(req.body.year, 10), req.body.director, parseInt(req.body.length, 10),
     req.body.actors.split(","), req.body.genre.split(","), req.body.preview, req.body.link.replace("watch?v=", "embed/"), parseInt(req.body.cost, 10))
    result.then(r => {
        res.redirect("/movies")
    })

}

const searchMovies = (req, res) => {
    res.render("searchMovies.ejs", {})
}
const search = (req, res) => {

    // Parse the get request to get both the parameters and the value
    const query = url.parse(req.url).query
    const param = query.split("=")[0]
    const value = query.split("=")[1]
    const result = MovieService.search(param, value)
    result.then(r => {
        console.log(r)
        res.json(r);
    })

}

const update = (req, res) => {
    MovieService.update(req.body.movie_index, req.body.preview, parseInt(req.body.views, 10), parseInt(req.body.profit, 10))
    res.redirect("/movies")
}

// Exports the neccesary functions
module.exports = {
    findAll,
    deleteMovie,
    addMovie,
    searchMovies,
    search,
    update
};