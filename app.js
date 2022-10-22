const express = require('express');
require('dotenv').config();
const app = express();

var io = require('socket.io')(http)

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

var http = require('http').createServer(app)

http.listen(process.env.PORT)