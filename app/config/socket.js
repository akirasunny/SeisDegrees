module.exports = function(socket) {
  // send online activity info to friends
  socket.on("signIn", function(data) {
    console.log("test sign In socket");
    socket.broadcast.emit("userJoined",data);
  });
  // send offline activity to friends
  socket.on("disconnect", function(data) {
    console.log("test sign out socket");
    socket.broadcast.emit("userLeft",data);
  });
  // join chat room
  socket.on("joinRoom", function(data) {
    console.log("test join room socket");
    socket.userId = data.id;
    socket.room = data.roomId;
    // users[data.BoardId][data.username]=data.username;
    socket.join(data.roomId);
    // socket.emit('userOnline',data.username); for saying who is online
  });
  // leave chat room
  socket.on("leaveRoom", function() {
    console.log("test leave room socket");
    socket.leave(socket.room);
  });
  // send message and open chat window
  socket.on("openOtherChat", function(data) {
    console.log("test open other socket");
    socket.broadcast.emit("tryingToJoin",data);
  });

  socket.on("chat", function(data) {
    console.log("test send chat socket");
    socket.broadcast.to(socket.room).emit("newChat", data);
  });
  socket.on("typing", function(data) {
    console.log("test typing socket");
    socket.broadcast.to(socket.room).emit("typing", data);
  });

}
