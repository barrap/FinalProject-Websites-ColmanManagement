import { update } from '../services/movies';

const MongoClient = require('mongodb').MongoClient;
const MongoURL = require('./config.js').MongoURL;
const dbName = require('./config.js').dbName;
const crypto = require('crypto'); 

/*                      CustomerDB                          */
/*                      Insert                          */


module.exports.insertCustomer = function(_id, _fullname, _username, _password, _location, _isAdmin, _phone)
/* The function insert new customer to the DB */
{
    MongoClient.connect(MongoURL, function(err, db) {
        if (err) throw err;
        var dbo = db.db(dbName);
        var hashed_password = crypto.pbkdf2Sync(_password, "", 1000, 64, `sha512`).toString(`hex`); // store password in hash format to DB 
        var new_customer = { id: _id, fullname: _fullname, username: _username, password: hashed_password, location: _location, isAdmin: _isAdmin, phone:_phone, orders:0 };
        dbo.collection("customers").insertOne(new_customer, function(err, res) {
          if (err) throw err;
          console.log("1 customer inserted");
          db.close();
        });
      });
}

/*                      Delete                          */

module.exports.deleteCustomer = function(_id)
/* The function deletes customer based on his ID */
{
  MongoClient.connect(MongoURL, function(err, db) {
      if (err) throw err;
      var dbo = db.db(dbName);
      var myquery = { id: _id };
      dbo.collection("customers").deleteOne(myquery, function(err, obj) {
        if (err) throw err;
        console.log("1 customer deleted");
        db.close();
      });
    });
}

/*                      Update                          */

module.exports.updatePassword = function(_id, _new_password) 
{
/* This function updates customer password */
  MongoClient.connect(MongoURL, function(err, db) {
      if (err) throw err;
      var dbo = db.db(dbName);
      var myquery = { id: _id };
      var hashed_password = crypto.pbkdf2Sync(_new_password, "", 1000, 64, `sha512`).toString(`hex`); 
      var newvalues = { $set: {password: hashed_password }};
      dbo.collection("customers").updateOne(myquery, newvalues, function(err, res) {
        if (err) throw err;
        console.log("1 document updated");
        db.close();
      });
    });
}

module.exports.updateLocation =  function(_id, new_location) 
{
/* This function updates customer location */
MongoClient.connect(MongoURL, function(err, db) {
    if (err) throw err;
    var dbo = db.db(dbName);
    var myquery = { id: _id };
    var newvalues = { $set: {location: new_location }};
    dbo.collection("customers").updateOne(myquery, newvalues, function(err, res) {
      if (err) throw err;
      console.log("1 document updated");
      db.close();
    });
  });
}

module.exports.updatePhone = function(_id, new_phone_number) 
{
/* This function updates customer phone number */
    MongoClient.connect(MongoURL, function(err, db) {
        if (err) throw err;
        var dbo = db.db(dbName);
        var myquery = { id: _id };
        var newvalues = { $set: {phone: new_phone_number }};
        dbo.collection("customers").updateOne(myquery, newvalues, function(err, res) {
          if (err) throw err;
          console.log("1 document updated");
          db.close();
        });
      });
}

module.exports.updatePermissions =  function(_id, new_perm) 
{
  /* This function updates customer phone number */
  MongoClient.connect(MongoURL, function(err, db) {
    if (err) throw err;
    var dbo = db.db(dbName);
    var myquery = { id: _id };
    var newvalues = { $set: {isAdmin: new_perm }};
    dbo.collection("customers").updateOne(myquery, newvalues, function(err, res) {
      if (err) throw err;
      console.log("1 document updated");
      db.close();
     });
  });
}

    
/*                      Find                          */
module.exports.verifyUser =  function(_username, _password) // TODO: fix !
{
    MongoClient.connect(MongoURL, async function(err, db) {
        if (err) throw err;
        var dbo = db.db(dbName);
        var hashed_password = crypto.pbkdf2Sync(_password, "", 1000, 64, `sha512`).toString(`hex`); 
        let test = dbo.collection("customers").find({"username" : _username}).toArray(function(err, docs) {
       });
        db.close();
       return test;
});
}


//TODO: fix the verifyUser function! 