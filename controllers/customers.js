const customersService = require("../services/customers")
const crypto = require('crypto');


// Function to send the login page
function loginPage(req, res) {

    // Sends the login page with empty message
    res.render("login.ejs", { message: { status: "" } })
}


// Function to try and login
async function login(req, res) {

    // Gets the values from the login form
    const { username, password } = req.body

    // Creates the new hashed password
    var hashed_password = crypto.pbkdf2Sync(password, "", 1000, 64, `sha512`).toString(`hex`);

    // Tries to login
    var customer = customersService.login(username)
    customer.then(cust => {

        // Checks if the user exists
        if (cust) {

            // Checks if the user entered the right password
            if (cust.password == hashed_password) {

                // Saves the username is the cookie (for future use) and redirects to the main page
                req.session.username = username
                res.redirect("/movies")
            }

            // The password that was enterd is wrong
            else {
                res.render("../views/login", { message: { status: "Wrong Password" } })
            }

        }

        // The user doesn'y exists
        else {
            res.render("../views/login", { message: { status: "Username doesn't exsit" } })
        }
    })
}


// Function to get the registration page
function registerPage(req, res) {

    // Senda the registration page with empty message
    res.render("register.ejs", { message: { status: "" } })
}

// Function to try and registar
async function register(req, res) {

    // Tries to registart the user
    try {
        await customersService.register(req.body.fullname, req.body.username, req.body.password, req.body.location, false, req.body.phone)

        // if successful than saves the username and redirects to the main page
        req.session.username = req.body.username
        res.redirect("/movies")
    }
    catch (e) {

        // The username already exists
        res.render("../views/register", { message: { status: "Username already exsits" } })
    }


}

// Function to delete a customer
function deleteCustomer(req, res) {

    // Checks if the users is logged in
    if (req.session.username != null) {

        // Gets the user data
        const customer = customersService.getCustomer(req.session.username)
        customer.then(cust => {

            // Checks if the user exists
            if (cust) {

                // Checks if the user is admin
                if (cust.isAdmin == true) {

                    // Deletes the user
                    const result = customersService.deleteCustomer(req.body.username)
                    result.then(r => {
                        res.redirect("/customers")
                    })

                }

                // The user isn't an admin so redirect to the main page
                else {
                    res.redirect("/movies")
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

// Function to update a customer details
function update(req, res) {

    // Checks if the users is logged in
    if (req.session.username != null) {

        // Gets the user data
        const customer = customersService.getCustomer(req.session.username)
        customer.then(cust => {

            // Checks if the user exists
            if (cust) {
                customersService.update(req.session.username, req.body.phone, req.body.location, req.body.password)

                // Checks if the user is admin
                if (cust.isAdmin == true) {
                    res.render("../views/UpdateUser-admin", { dict: { username: cust._id, message: "Update Completed" } })
                }
                else {
                    res.render("../views/UpdateUser", { dict: { username: cust._id, message: "Update Completed" } })
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

// Function to send the update user page
function updateUser(req, res) {

    // Checks if the users is logged in 
    if (req.session.username != null) {

        // Gets the user data
        const customer = customersService.getCustomer(req.session.username)
        customer.then(cust => {

            // Checks if the user exists
            if (cust) {

                // Checks if the user is admin
                if (cust.isAdmin == true) {
                    res.render("../views/UpdateUser-admin", { dict: { username: cust._id, message: "" } })
                }
                else {
                    res.render("../views/UpdateUser", { dict: { username: cust._id, message: "" } })
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


// Function to logouy
function logout(req, res) {

    // Delets the session and redirects to the home page
    req.session.destroy(() => {
        res.redirect("/")
    })
}

// Function to get all the customers data
function getAllCustomers(req, res) {

    // Checks if the users is logged in 
    if (req.session.username != null) {

        // Gets the user data
        const customer = customersService.getCustomer(req.session.username)
        customer.then(cust => {

            // Checks if the user exists
            if (cust) {

                // Checks if the user is admin
                if (cust.isAdmin == true) {

                    // Gets the data of all the users
                    const result = customersService.getAllCustomers()
                    result.then(r => {

                        // Adds the username of the current user
                        r['username'] = cust._id
                        res.render("../views/customers", { customers: r })
                    })
                }

                // The user isn't an admin so redirect to the main page
                else {
                    res.redirect("/movies")
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


// Function to add an admin property to a customer
function addAdmin(req, res) {

    // Checks if the users is logged in 
    if (req.session.username != null) {

        // Gets the user data
        const customer = customersService.getCustomer(req.session.username)
        customer.then(cust => {

            // Checks if the user exists
            if (cust) {

                // Checks if the user is admin
                if (cust.isAdmin == true) {

                    // Calls a function to update the user admin property
                    const result = customersService.updateAdmin(req.body.username, true)
                    result.then(r => {
                        res.redirect("/customers")
                    })
                }

                // The user isn't an admin so redirect to the main page
                else {
                    res.redirect("/movies")
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

// Function to remove an admin property to a customer
function removeAdmin(req, res) {

    // Checks if the users is logged in
    if (req.session.username != null) {

        // Gets the user data
        const customer = customersService.getCustomer(req.session.username)
        customer.then(cust => {

            // Checks if the user exists
            if (cust) {

                // Checks if the user is admin
                if (cust.isAdmin == true) {

                    // Calls a function to update the user admin property
                    const result = customersService.updateAdmin(req.body.username, false)
                    result.then(r => {
                        res.redirect("/customers")
                    })
                }

                // The user isn't an admin so redirect to the main page
                else {
                    res.redirect("/movies")
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

// Exports all the function
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
