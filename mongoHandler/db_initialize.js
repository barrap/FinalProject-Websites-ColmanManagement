var MongoClient = require('mongodb').MongoClient;
var DBurl = require('config.js').DBurl;
var MongoURL = require('config.js').MongoURL;
var dbName = require('config.js').dbName;

function createDB()
/*
    Creates new database 
*/
{
    MongoClient.connect(DBurl, function(err, db) {
        if (err) throw err;
        console.log("Database created!");
        db.close();
      });
}

function createCollectionDB(collection_name)
/*
    The function creates new collection
*/
{
    MongoClient.connect(MongoURL, function(err, db) {
        if (err) throw err;
        var dbo = db.db(dbName);
        dbo.createCollection(collection_name, function(err, res) {
          if (err) throw err;
          console.log("Collection created!");
          db.close();
        });
      });
}

function initializeDB()
/*
    The function initialize a new database instance and the relevant collections. 
*/
{
    createDB();
    createCollectionDB("customers");
    createCollectionDB("credit_cards");
    createCollectionDB("movies");
    createCollectionDB("episode");
    createCollectionDB("tvshows");
    createCollectionDB("locations");
    createCollectionDB("orders");
}