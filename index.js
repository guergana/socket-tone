var express = require('express');
var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
app.use(express.static(__dirname + '/'));

var port = process.env.PORT || 3000;

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

var usernames = {};

io.on('connection', function(socket){

	
	socket.on('adduser', function(username){
		// we store the username in the socket session for this client
		socket.username = username;
		// add the client's username to the global list
		usernames[username] = username;
		// echo to client they've connected
		socket.emit('updatechat', 'SERVER', 'you have connected');
		// echo globally (all clients) that a person has connected
		socket.broadcast.emit('updatechat', 'SERVER', username + ' has connected');
		// update the list of users in chat, client-side
		//io.sockets.emit('updateusers', usernames);
	});
	
	socket.on('disconnect', function(){
		
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