
const express = require('express');

// Imports the required modules
const moviesController = require('../controllers/movies');
const CustomerController = require("../controllers/customers")
const router = express.Router();

const public_dir_path = "C:\\Users\\barra\\Desktop\\לימודים\\שנה ב\\סמסטר קיץ\\פיתוח אפליקציות אינטרנטיות\\מטלות\\final - project\\public"

router.get("/", (req, res) => {
        res.sendFile(public_dir_path + "\\homepage.html")
})

router.get("/login", CustomerController.loginPage)
router.post("/login", CustomerController.login)
router.post("/register", CustomerController.register)
router.get("/register", CustomerController.registerPage)
router.get("/logout", CustomerController.logout)

// Movies routing
router.get('/movies', moviesController.findAll);
router.get("/moviesAdmin", moviesController.findAllAdmin)
router.post("/deleteMovie", moviesController.deleteMovie)
router.post("/addMovie", moviesController.addMovie)
router.get("/search", moviesController.search)
router.get("/searchMovies", moviesController.searchMovies)
router.post("/update", moviesController.update)

module.exports = router;