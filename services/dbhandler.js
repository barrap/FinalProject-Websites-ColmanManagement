const customersService = require("./customers")
const creditCardService = require("./creditCard")
const locationsService = require('./location');
const MovieService = require('./movies');
const TVShowsService = require('./tvshow');
const OrdersService = require("./orders");


const fs = require('fs');


const inital_db = () =>
{
    // Inital location data - done
    fs.readFile("data/locations.json", 'utf8', function(err, data){
        try{
        locationsService.uploadJson((JSON.parse(data)));
         }
        catch(err)
        {
            
        }
    });


    
    // Inital Movies - done
    fs.readFile("data/movies.json", 'utf8', function(err, data){
        try{
            MovieService.uploadJson((JSON.parse(data)));
        }
        catch(err)
        {
        }
    });
    

    // Inital TVShows - done
    fs.readFile("data/tvshows.json", 'utf8', function(err, data){
        try{
            TVShowsService.uploadJson((JSON.parse(data)));
        }
        catch(err)
        {

        }
    });
  
    // Inital customers - done
    fs.readFile("data/customers.json", 'utf8', function(err, data){
        try{
            customersService.uploadJson((JSON.parse(data)));
        }
        catch(err)
        {

        }
    });

    // Inital Orders - done
    fs.readFile("data/orders.json", 'utf8', function(err, data){
        try{
            OrdersService.uploadJson((JSON.parse(data)));
        }
        catch(err)
        {

        }
    });

    // Inital creditcards // fix 
    fs.readFile("data/creditcards.json", 'utf8', function(err, data){
        try{
            creditCardService.uploadJson((JSON.parse(data)));
        }
        catch(err)
        {

        }
    });
}

module.exports = {
    inital_db
}