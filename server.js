// Require our dependecies
var express = require("express");
var mongoose = require("mongoose");
var bodyParser = require("body-parser");
var socket = require("./app/config/socket.js");
var routes = require("./routes/routes");

// Set up a default port, configure mongoose, configure our middleware
var PORT = process.env.PORT || 3000;
mongoose.Promise = Promise;
var app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(__dirname + "/public"));
app.use("/", routes);

// Sets up server for sockets
var server = require('http').Server(app);
var io = require('socket.io').listen(server);

//mongodb://heroku_zzb0c88g:3amsr8er3fbofcoausvabdb03s@ds155934.mlab.com:55934/heroku_zzb0c88g
//mongodb://localhost/6degrees

var db = process.env.MONGODB_URI || "mongodb://localhost/6degrees";

// Connect mongoose to our database
mongoose.connect(db, function(error) {
  // Log any errors connecting with mongoose
  if (error) {
    console.error(error);
  }
  // Or log a success message
  else {
    console.log("mongoose connection is successful");
  }
});

// Start the server
server.listen(PORT, function() {
  console.log("Now listening on port %s! Visit localhost:%s in your browser.", PORT, PORT);
});


// Websocket emissions
io.sockets.on("connection", socket);
