// Require our dependecies
var express = require("express");
var mongoose = require("mongoose");
var bodyParser = require("body-parser");
var socket = require("socket.io");
var routes = require("./routes/routes");

// Requiring our models
var User = require("./models/User.js");
var Post = require("./models/Post.js");
var Chat = require("./models/Chat.js");

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
var io = socket(server);

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

//
// // Websocket emissions
// io.sockets.on("connection", function(socket) {
//   // console.log("made socket connection", socket.id);
//   socket.on("joinRoom", function(data){
//     socket.username = data.username;
//     socket.room = data.BoardId.toString();
//     // users[data.BoardId][data.username]=data.username;
//     socket.join(data.BoardId.toString());
//     // socket.emit('userOnline',data.username); for saying who is online
//   });
//   socket.on("disconnect", function(){
//     // delete users[socket.room][socket.username];
//     socket.leave(socket.room);
//     // socket.emit('userOffline',socket.username); for saying who dced
//   });
//   socket.on("chat", function(data) {
//     io.sockets.in(socket.room).emit("chat", data);
//   });
//   socket.on("typing", function(data) {
//     socket.broadcast.to(socket.room).emit("typing", data);
//   });
//   // real time for tasks and lists
//   socket.on("list", function(data){
//     // console.log(data);
//     io.sockets.in(socket.room).emit("list", data);
//   });
//   socket.on("task", function(data){
//     // console.log(data);
//     io.sockets.in(socket.room).emit("task", data);
//   });
//   socket.on("deleteList", function(data){
//     // console.log(data);
//     io.sockets.in(socket.room).emit("deleteList", data);
//   });
//   socket.on("deleteTask", function(data){
//     // console.log(data);
//     io.sockets.in(socket.room).emit("deleteTask", data);
//   });
//   // real time for updating positions for tasks and lists
//   socket.on('moveCards', function(data) {
//     io.sockets.in(socket.room).emit('moveCard', data);
//   });
//   socket.on('moveLists', function() {
//     io.sockets.in(socket.room).emit('moveList');
//   });
//   // real time for updating values of tasks/lists
//   socket.on('editListTasks', function(data) {
//     io.sockets.in(socket.room).emit('editListTask', data);
//   });
// });
