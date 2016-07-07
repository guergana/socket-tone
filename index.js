var express = require('express');
var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
app.use(express.static(__dirname + '/'));

var port = process.env.PORT || 3000;

var userNum = 0;

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});


io.on('connection', function(socket){
	userNum++;
	var currentUser = 'user'+userNum;
	console.log(currentUser + ' connected, connected users: ' + userNum);
	
	socket.on('disconnect', function(){
		userNum--;
		console.log(currentUser + ' disconnected, connected users: ' + userNum);
	});
  
	socket.on('chat message', function(msg){
		var line = currentUser + ': ' + msg;
		console.log( 'message: ' + line);
		io.emit('chat message', line);
	});
  
  
  
});

http.listen(port, function(){
  console.log('listening on *:'+ port );
});