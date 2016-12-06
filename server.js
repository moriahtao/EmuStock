const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// configure a public directory to host static content
app.use(express.static(__dirname + '/public'));

var passport      = require('passport');
var cookieParser  = require('cookie-parser');
var session       = require('express-session');

app.use(session({
    secret: 'this is the secret',
    resave: true,
    saveUninitialized: true
}));
app.use(cookieParser());
app.use(passport.initialize());
app.use(passport.session());


// mongoose db connection
var connectionString = 'mongodb://localhost/emustock';
var mongoose = require("mongoose");
var db = new mongoose.Mongoose();
db.Promise = global.Promise;
db.connect(connectionString);
db.connection.once('open', () => console.log('mongodb connected: EmuStock'));

require("./server/app-server.js")(app, db);

var port = 8080;
app.listen(port);

console.log('server started, listening port', port);
