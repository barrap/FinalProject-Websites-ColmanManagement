const CreditCardService = require('../services/creditCard');
const customersService = require("../services/customers");
const OrdersService = require("../services/orders");

// Function to add payment 
const paying = (req, res) => {

    // Checks if the users is logged in
    if (req.session.username != null) {
        

        // Gets the user data
        const customer = customersService.getCustomer(req.session.username)
        customer.then(cust => {

            // Checks if the user exists
            if (cust) {
                try {
                    customersService.addOrder(req.session.username)
                    console.log(req)
                    if(req.body.vote)
                    {
                        res.redirect("/main")
                    }
                    else if (CreditCardService.getCardByNumber(req.body.cardNumber)) {
                        res.redirect("/main")
                    }
                    else {
                        const result = CreditCardService.addCard(req.body.cardNumber, req.session.username, req.body.date, req.body.secNum)
                        result.then(r => {
                            res.redirect("/main")
                        })
                    }
                }
                catch (e) {
                    res.render("../views/main", { message: { status: "" } })
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

// Function to add order 
const order = (req, res) => {
    information = {}

    // Checks if the users is logged in
    if (req.session.username != null) {

        // Gets the user data
        const customer = customersService.getCustomer(req.session.username)
        customer.then(cust => {


            // Checks if the user exists
            if (cust) {
                cards = CreditCardService.getCreditCard(cust._id)
                cards.then(r => {
                    information['username'] = cust._id
                    information['fullname'] = cust.fullname
                    information['cards'] = r
                    res.render("addOrder.ejs", { info: information })
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

module.exports = {
    paying,
    order
}