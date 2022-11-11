const express = require('express');
require('dotenv').config();
const app = express();
var ws = require('websocket').server;
var http = require('http')
var server = http.createServer(app)
var wsServer = new ws({ httpServer: server });

wsServer.on('request', function (request) {
    console.log('A new client Connected!');
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
