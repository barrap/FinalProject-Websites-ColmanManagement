const loginService = require('../services/login');

async function login(req, res) {
    const {username, password} = req.body

    const result = await loginService.login(username, password)
    if(result) {
        req.session.username = username
        console.log(username)
        res.redirect("/movies")
    }
}

module.exports = {
    login
}

