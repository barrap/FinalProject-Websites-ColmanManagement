var MongoClient = require('mongodb').MongoClient;
var MongoURL = require('config.js').MongoURL;
var dbName = require('config.js').dbName;
var crypto = require('crypto'); 

function insertCustomer(_id, _fullname, _username, _password, _location, _isAdmin, _phone)
/* The function insert new customer to the DB */
{
    MongoClient.connect(MongoURL, function(err, db) {
        if (err) throw err;
        var dbo = db.db(dbName);

        // TODO: verify that the hash function works 
        var hashed_password = crypto.pbkdf2Sync(password, "", 1000, 64, `sha512`).toString(`hex`); // store password in hash format to DB 
        var new_customer = { id: _id, fullname: _fullname, password: hashed_password, location: _location, isAdmin: _isAdmin, phone:_phone, orders:0 };
        dbo.collection("customers").insertOne(new_customer, function(err, res) {
          if (err) throw err;
          console.log("1 customer inserted");
          db.close();
        });
      });
}

function deleteCustomer(_id)
/* The function deletes customer based on his ID */
{
    MongoClient.connect(url, function(err, db) {
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

// TODO: add password update for customer
// TODO: add location update for customer
// TODO: add phone number update for customer
// TODO: add permission(admin/regular user) update for customer