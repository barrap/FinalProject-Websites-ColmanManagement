const express = require('express');
require('dotenv').config();
const app = express();
var ws = require('ws');
var server = require('http').createServer(app)
var wsServer = new ws.Server({server});

wsServer.on('connection', (ws) => {
    console.log('A new client Connected!');
    ws.send('Welcome New Client!');
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
