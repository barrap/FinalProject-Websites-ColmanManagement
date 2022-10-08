const MongoClient = require('mongodb').MongoClient;
const MongoURL = require('./config.js').MongoURL;
const dbName = require('./config.js').dbName;



module.exports.insertCard = function(_card_number, _owner_id, _exp_date, _digits)
/* The function insert new credit card to the DB */
{
    MongoClient.connect(MongoURL, function(err, db) {
        if (err) throw err;
        var dbo = db.db(dbName);
        var new_card = { card_number:_card_number, owner_id: _owner_id, exp_date: _exp_date, digits: _digits};
        dbo.collection("credit_cards").insertOne(new_card, function(err, res) {
          if (err) throw err;
          console.log("1 credit card inserted");
          db.close();
        });
      });
}

module.exports.deleteCard = function(_card_number)
{
    MongoClient.connect(MongoURL, function(err, db) {
        if (err) throw err;
        var dbo = db.db(dbName);
        var myquery = { card_number: _card_number };
        dbo.collection("credit_cards").deleteOne(myquery, function(err, obj) {
          if (err) throw err;
          console.log("1 credit card deleted");
          db.close();
        });
      });
}