const MongoClient = require('mongodb').MongoClient;
const MongoURL = require('./config.js').MongoURL;
const dbName = require('./config.js').dbName;



module.exports.insertMovie = function(_name, _year, _stagemanager, _length, _main_actors, _type, _short_overview, _trailer, _price)
/* The function insert new movie to the DB */
{
    MongoClient.connect(MongoURL, function(err, db) {
        if (err) throw err;
        var dbo = db.db(dbName);
        var new_movie = { name:_name, year: _year, stagemanager: _stagemanager, length: _length, main_actors: _main_actors, type:_type, short_overview: _short_overview, trailer: _trailer, price: _price};
        dbo.collection("movies").insertOne(new_movie, function(err, res) {
          if (err) throw err;
          console.log("1 movie inserted");
          db.close();
        });
      });
}

module.exports.deleteMovie = function(_name, _year)
/* This function deletes a movie */
{
    MongoClient.connect(MongoURL, function(err, db) {
        if (err) throw err;
        var dbo = db.db(dbName);
        var myquery = { name: _name, year: _year };
        dbo.collection("movies").deleteOne(myquery, function(err, obj) {
          if (err) throw err;
          console.log("1 movie deleted");
          db.close();
        });
    });
}

module.exports.updateMovieDescription = function(_name, _year, _description)
/* This function updates a movie description */
{
    MongoClient.connect(MongoURL, function(err, db) {
        if (err) throw err;
        var dbo = db.db(dbName);
        var myquery = { name: _name, year: _year };
        var newvalues = { $set: {short_overview: _description }};
        dbo.collection("movies").updateOne(myquery, newvalues, function(err, res) {
        if (err) throw err;
        console.log("1 movie updated");
        db.close();
        });
    });
}

module.exports.updatePrice = function(_name, _year, _price)
/* This function updates the price of a movie */
{
    MongoClient.connect(MongoURL, function(err, db) {
        if (err) throw err;
        var dbo = db.db(dbName);
        var myquery = { name: _name, year: _year };
        var newvalues = { $set: {price: _price }};
        dbo.collection("movies").updateOne(myquery, newvalues, function(err, res) {
        if (err) throw err;
        console.log("1 movie updated");
        db.close();
        });
    });
}

