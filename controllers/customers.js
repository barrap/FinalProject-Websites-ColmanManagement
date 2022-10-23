const customersService = require("../services/customers")
const crypto = require('crypto');

function loginPage(req, res) {
    res.render("login.ejs", { message: { status: "" } })
}


async function login(req, res) {
    const { username, password } = req.body
    var hashed_password = crypto.pbkdf2Sync(password, "", 1000, 64, `sha512`).toString(`hex`);
    var customer = customersService.login(username, password)
    customer.then(cust => {
        if (cust) {
            if (cust.password == hashed_password) {
                req.session.username = username
                if (cust.isAdmin == true) {
                    res.redirect("/moviesAdmin")
                }
                else {
                    res.redirect("/movies")
                }

            }
            else {
                res.render("../views/login", { message: { status: "Wrong Password" } })
            }

        }
        else {
            res.render("../views/login", { message: { status: "Username doesn't exsit" } })
        }
    })

}

function registerPage(req, res) {
    res.render("register.ejs", { message: { status: "" } })
}

async function register(req, res) {

    try {
        await customersService.register(req.body.fullname, req.body.username, req.body.password, req.body.location, false, req.body.phone)
        req.session.username = req.body.username
        res.redirect("/movies")
    }
    catch (e) {
        res.render("../views/register", { message: { status: "Username already exsits" } })
    }


}

function deleteCustomer(req, res) {
    //TODO: update content (only use while admin)
}

function update(req, res) {
    //TODO: update content (update permissions only while admin)
}

function logout(req, res) {
    req.session.destroy(() => {
        res.redirect("/")
    })
}

module.exports = {
    loginPage,
    login,
    registerPage,
    register,
    deleteCustomer,
    update,
    logout
}
