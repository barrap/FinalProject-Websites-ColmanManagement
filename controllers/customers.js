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
                req.session.isAdmin = cust.isAdmin
                res.redirect("/movies")
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
    const customer = customersService.getCustomer(req.session.username)
    customer.then(cust => {
        if (cust.isAdmin == true) {
            const result = customersService.deleteCustomer(req.body.username)
            result.then(r => {
                res.redirect("/customers")
            })

        }
        else {
            res.redirect("/movies")
        }

    })


}


function update(req, res) {
    if (req.session.username != null) {
        const customer = customersService.getCustomer(req.session.username)
        customer.then(cust => {
            if (cust) {
                customersService.update(req.session.username, req.body.phone, req.body.location, req.body.password)
                if (cust.isAdmin == true) {
                    res.render("../views/UpdateUser-admin", { dict: { username: cust._id, message: "Update Completed" } })
                }
                else {
                    res.render("../views/UpdateUser", { dict: { username: cust._id, message: "Update Completed" } })
                }
            }
            else {
                res.redirect("/movies")
            }
        })
    }
    else {
        res.redirect("/")
    }
    customersService.update(req.session.username, req.body.phone, req.body.location, req.body.password)
}

function updateUser(req, res) {
    if (req.session.username != null) {
        const customer = customersService.getCustomer(req.session.username)
        customer.then(cust => {
            if (cust) {
                if (cust.isAdmin == true) {
                    res.render("../views/UpdateUser-admin", { dict: { username: cust._id, message: "" } })
                }
                else {
                    res.render("../views/UpdateUser", { dict: { username: cust._id, message: "" } })
                }
            }
            else {
                res.redirect("/movies")
            }
        })
    }
    else {
        res.redirect("/")
    }


}

function logout(req, res) {
    req.session.destroy(() => {
        res.redirect("/")
    })
}

function getAllCustomers(req, res) {
    const customer = customersService.getCustomer(req.session.username)
    customer.then(cust => {
        if (cust) {
            if (cust.isAdmin == true) {
                const result = customersService.getAllCustomers()
                result.then(r => {
                    r['username'] = req.session.username
                    res.render("../views/customers", { customers: r })
                })
            }
            else {
                res.redirect("/movies")
            }
        }
        else {
            res.redirect("/movies")
        }
    })

}

function addAdmin(req, res) {
    if (req.session.username != null) {
        if (req.session.isAdmin == true) {
            const result = customersService.updateAdmin(req.body.username, true)
            result.then(r => {
                res.redirect("/customers")
            })

        }
        else {
            res.redirect("/movies")
        }
    }
    else {
        res.redirect("/movies")
    }
}

function removeAdmin(req, res) {
    if (req.session.username != null) {
        if (req.session.isAdmin == true) {
            const result = customersService.updateAdmin(req.body.username, false)
            result.then(r => {
                res.redirect("/customers")
            })

        }
        else {
            res.redirect("/movies")
        }
    }
    else {
        res.redirect("/movies")
    }
}

module.exports = {
    loginPage,
    login,
    registerPage,
    register,
    deleteCustomer,
    update,
    updateUser,
    logout,
    getAllCustomers,
    addAdmin,
    removeAdmin
}
