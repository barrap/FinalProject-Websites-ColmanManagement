
const express = require('express');

// Imports the required modules
const moviesController = require('../controllers/movies');
const TVShowsController = require('../controllers/tvshows');
const CustomerController = require("../controllers/customers");
const LocationController = require("../controllers/maps");
const MainController = require("../controllers/main")
const statController = require("../controllers/stats")
const CreditCardsController = require("../controllers/credit_cards")
const router = express.Router();

// Public dir path (for static files)
const public_dir_path = "../public"

router.get("/", (req, res) => {
        res.sendFile("homepage.html", { root: 'public' })
})

router.get("/main", MainController.mainPage)
router.get("/filter", MainController.filter)

// Credit cards routing 
router.get("/updatePayment", CreditCardsController.updatePayment)
router.post("/deleteCard", CreditCardsController.deleteCard)
router.post("/addCard",CreditCardsController.addCard)


// Customers routing
router.get("/login", CustomerController.loginPage)
router.post("/login", CustomerController.login)
router.post("/register", CustomerController.register)
router.get("/register", CustomerController.registerPage)
router.get("/logout", CustomerController.logout)
router.get("/customers", CustomerController.getAllCustomers)
router.post("/deleteCustomer", CustomerController.deleteCustomer)
router.post("/addAdmin", CustomerController.addAdmin)
router.post("/removeAdmin", CustomerController.removeAdmin)
router.get("/updaeUserPage", CustomerController.updateUser)
router.post("/updateUser", CustomerController.update)

// Movies routing
router.get('/movies', moviesController.findAll);
router.get("/movie", moviesController.getMovie)
router.post("/deleteMovie", moviesController.deleteMovie)
router.get("/addMoviePage", moviesController.addMoviePage)
router.post("/addMovie", moviesController.addMovie)
router.get("/searchMovie", moviesController.search)
router.get("/searchMovies", moviesController.searchMovies)
router.post("/updateMovies", moviesController.update)
router.post("/addOrder", moviesController.order)
router.post("/paying", moviesController.paying)
router.post("/upload", moviesController.upload);
router.get("/filter_movies", moviesController.filter)
router.get("/allMovies", moviesController.allMovies)

// Locations routing
router.get("/locations", LocationController.Alllocations);
router.get("/addLocationPage", LocationController.addLocationPage)
router.post("/addLocation", LocationController.addLocation)
router.get("/deleteLocationPage", LocationController.deleteLocationPage)
router.post("/deleteLocation", LocationController.deleteLocation)

// TV Shows routing
router.get('/tvshows', TVShowsController.findAll);
router.get("/tvshow", TVShowsController.getTVShow)
router.post('/deleteShow', TVShowsController.deleteTvshow);
router.get("/addShowPage", TVShowsController.addShowPage)
router.post("/addTVShow", TVShowsController.addTVShow)
router.post("/updateShows", TVShowsController.update)
router.get("/searchShows", TVShowsController.searchTVShows)
router.get("/searchTV", TVShowsController.search)
router.get("/filter_tvshows", TVShowsController.filter)
router.get("/allShows", TVShowsController.allShows)


// Stats routing
router.get("/admin-stats", statController.GetData);


module.exports = router;