const customersService = require("../services/customers")
const creditCardService = require("../services/creditCard")
const crypto = require('crypto');



// Function to add a card
const addCard = (req, res) => {

    // Checks if the users is logged in
    if (req.session.username != null) {

        // Gets the user data
        const customer = customersService.getCustomer(req.session.username)
        customer.then(cust => {

            // Checks if the user exists
            if (cust) {
                const result = creditCardService.addCard(req.body.cardNumber, req.session.username, req.body.date, req.body.secNum)
                result.then(r => {
                    res.redirect("/updatePayment")
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

// Function to delete a card
const deleteCard = (req, res) => {

    // Checks if the users is logged in
    if (req.session.username != null) {

        // Gets the user data
        const customer = customersService.getCustomer(req.session.username)
        customer.then(cust => {

            // Checks if the user exists
            if (cust) {

                
                const result = creditCardService.deleteCard(req.body.card_id)
                result.then(r => {
                    res.redirect("/updatePayment")
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

// Function to send the update user page
function updatePayment(req, res) {

    // Checks if the users is logged in 
    if (req.session.username != null) {

        // Gets the user data
        const customer = customersService.getCustomer(req.session.username)
        customer.then(cust => {

            // Checks if the user exists
            if (cust) {
                results =[]
                cards = creditCardService.getCreditCard(cust._id)
                cards.then(c=>
                    {
                        results['username'] = cust._id
                        results['cards'] = c
                        // Checks if the user is admin
                        if (cust.isAdmin == true) {
                            res.render("../views/UpdatePayment-admin", {  dict: results })
                        }
                        else {
                            res.render("../views/UpdatePayment", { dict: results })
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



// Exports all the function
module.exports = {
    updatePayment,
    deleteCard,
    addCard
}
