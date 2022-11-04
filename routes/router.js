
const express = require('express');

// Imports the required modules
const moviesController = require('../controllers/movies');
const CustomerController = require("../controllers/customers");
const LocationController = require("../controllers/maps");
const router = express.Router();

// Public dir path (for static files)
const public_dir_path = "../public"

router.get("/", (req, res) => {
        res.sendFile("homepage.html",  { root: 'public' })
})


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
router.get("/search", moviesController.search)
router.get("/searchMovies", moviesController.searchMovies)
router.post("/updateMovies", moviesController.update)
router.post("/addOrder", moviesController.order)
router.post("/paying", moviesController.paying);

// Locations routing
router.get("/locations", LocationController.Alllocations);


module.exports = router;