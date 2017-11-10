var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var fs = require('fs');

var sounds;

io.on('connection', function(socket){
  console.log('a user connected');
  socket.on('disconnect', function(){
    console.log('user disconnected');
  });
});

io.on('connection', function(socket){
  socket.on('noteChange', function(msg){
    console.log(msg.gridSize);
    io.emit('noteChange', msg);
  });
  socket.on('soundUpdate', function(msg){
  	
    sounds = msg;
    console.log(sounds['1']);

  });
  socket.on('loaded', function(msg){
  console.log(!sounds);
  	console.log(msg['1']);
  	if(!sounds) {
  		sounds = msg;
  	} else {
  		io.emit('loaded', sounds);
  	}
   
  });
});


http.listen(3001, function(){
  console.log('listening on *:3000');
});


// var fs = require('fs');

// // Change the content of the file as you want
// // or either set fileContent to null to create an empty file
// var fileContent = "Hello World!";

// // The absolute path of the new file with its name
// var filepath = "mynewfile.txt";

// fs.writeFile(filepath, fileContent, (err) => {
//     if (err) throw err;

//     console.log("The file was succesfully saved!");
// }); 