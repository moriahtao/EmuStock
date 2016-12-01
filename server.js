const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// configure a public directory to host static content
app.use(express.static(__dirname + '/public'));

// mongoose db connection
var connectionString = 'mongodb://localhost/emustock';
var mongoose = require("mongoose");
var db = new mongoose.Mongoose();
db.connect(connectionString);
db.connection.once('open', () => console.log('mongodb connected: EmuStock'));

require("./server/app-server.js")(app, db);

var port = 8080;
app.listen(port);

console.log('server started, listening port', port);
