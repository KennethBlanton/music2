var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var fs = require('fs');

var sessions = {}

// io.on('connection', function(socket){
//   console.log('a user connected');
//   socket.on('disconnect', function(){
//     console.log('user disconnected');
//   });
// });

io.on('connection', function(socket){

    socket.on('noteChange', function(msg){
        // console.log(msg.session);
        // console.log(io.sockets.adapter.rooms[msg.session]);
        io.emit('noteChange', msg);
        // io.emit('rooms', io.sockets);
        // io.to(msg.session).emit('noteChange', msg);
        // io.to(io.sockets.adapter.rooms[msg.session]).emit('noteChange', msg);
    });

  socket.on('soundUpdate', function(msg){
     

      sessions[msg.session] = msg.sounds;
       console.log(sessions[msg.session].sounds);
  });

  socket.on('loaded', function(msg){
    // console.log(msg.session);
  	if(!sessions[msg.session]) {
  		sessions[msg.session] = msg.sounds;
      socket.join(msg.session);
      console.log(msg.session)
  	} else {
      socket.join(msg.session)
  		io.emit('loaded', sessions[msg.session]);
  	}
    // console.log(sessions);
   
  });
  socket.on('createSession',function(msg) {
    // console.log(msg)
    if(sessions[msg]) {
      io.emit('createSession', {valid:false,name:msg});
    } else {
      io.emit('createSession', {valid:true,name:msg});
    }
  })
  socket.on('joinSession',function(msg) {
    // console.log(msg)
    if(sessions[msg]) {
      io.emit('joinSession', {valid:true,name:msg, sounds:sessions[msg]});
    } else {
      io.emit('joinSession', {valid:false,name:msg});
    }
  })
  // socket.on('multipleNote', function(msg){
  //   for (var i = 0; i < msg.notes.length; i++) {
  //    if(sessions[msg.session][msg.note[i]] = 
  //   }
    

  // })
  socket.on('rooms', function() {
    console.log('recieved');
    let obj = io.sockets.adapter.rooms
    io.emit('rooms', obj);
  })
});


http.listen(3001, function(){
  console.log('listening on *:3000');
});
