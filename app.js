const express = require('express');
require('dotenv').config();
const app = express();
var ws = require('websocket').server;
var http = require('http')
var server = http.createServer(app)
var wsServer = new ws({ httpServer: server });
var usersCounter = 0;

if(process.env.INIT_DB == "false") {
    require('./services/dbhandler.js').inital_db();
    process.env.INIT_DB == "true"
}

const clients = {};


wsServer.on('request', function (request) {
    var connection = request.accept(null, request.origin);
    const updateCounter = function (type,val) {
        for (var key in clients) {            
            clients[key].sendUTF(JSON.stringify({
                type: type,
                value: val
            }));
        };
    }    

    let userID = Math.random().toString(36).substring(7);
    clients[userID] = connection;
    updateCounter('counter',Object.keys(clients).length);
    
    connection.on('close', () => {
        delete clients[userID];        
        updateCounter('counter',Object.keys(clients).length);
    });
});


app.use(express.static("public"));

const session = require('express-session')
app.use(session({
    secret: 'bar',
    saveUninitialized: false,
    resave: false
}))

app.use(express.urlencoded());
app.set('view engine', 'ejs');

app.use('/', require('./routes/router'));

server.listen(process.env.PORT)
