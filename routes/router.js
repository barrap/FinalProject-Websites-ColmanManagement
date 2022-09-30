
const express = require('express');

// Imports the required modules
const moviesController = require('../controllers/movies');
const loginController = require("../controllers/login")
const router = express.Router();

// Sets the routes accordingly
router.get('/', (req, res) => {
        res.sendFile("C:\\Users\\barra\\Desktop\\לימודים\\שנה ב\\סמסטר קיץ\\פיתוח אפליקציות אינטרנטיות\\מטלות\\final - project\\public\\homepage.html")
})

// Login routing
router.post("/login", loginController.login)


// Movies routing
router.get('/movies', moviesController.findAll);
router.post("/deleteMovie", moviesController.deleteMovie)
router.post("/addMovie", moviesController.addMovie)
router.get("/search", moviesController.search)
router.get("/searchMovies", moviesController.searchMovies)
router.post("/update", moviesController.update)

module.exports = router;