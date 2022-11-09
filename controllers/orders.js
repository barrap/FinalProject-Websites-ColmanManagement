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
                    cart =parseCart(req.body.cart)
                    const date = new Date()
                    OrdersService.addOrder(cart['price'], cart['titles'], req.session.username, date.getFullYear(), date.getMonth()+1, date.getDate() )
                    
                    cardi = CreditCardService.getCardByNumber(req.body.cardNumber)
                    cardi.then(c =>
                        {
                            if(!(req.body.vote) && !(c))
                            {
                                CreditCardService.addCard(req.body.cardNumber, req.session.username, req.body.date, req.body.secNum)
                                
                            }
                            res.redirect("/main")
                        })
                }
                catch (e) {
                    console.log(e)
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

                    // Checks if the user is admin
                    if (cust.isAdmin == true) {
                        res.render("addOrder-admin.ejs", { info: information })
                    }

                    // The user is not an admin
                    else {
                        res.render("addOrder.ejs", { info: information })
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

function parseCart(cart)
{
    cart = cart.slice(2)
    cart = cart.slice(0,-2)
    cart_arr = cart.split("},{")
    titles=[]
    price=0
    for(i=0;i<cart_arr.length;i++)
    {
        cart_arr[i] = cart_arr[i].split(",")
        for(j=0;j<cart_arr[i].length;j++)
        {
            cart_arr[i][j] = cart_arr[i][j].slice(cart_arr[i][j].indexOf(':'))
            cart_arr[i][j] = cart_arr[i][j].slice(1)
        }
        titles.push(cart_arr[i][0])
        price+=(parseInt(cart_arr[i][2], 10)*parseInt(cart_arr[i][3]))
    }
    cart = []
    cart['price'] = price
    cart['titles'] = titles
    return cart
}

module.exports = {
    paying,
    order
}