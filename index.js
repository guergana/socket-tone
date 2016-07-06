var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

var port = process.env.PORT || 8080;

app.get('/', function(req, res){
  res.sendFile(app.static(__dirname + '/index.html'));
});

io.on('connection', function(socket){
  console.log('a user connected');
   socket.on('disconnect', function(){
    console.log('user disconnected');
  });
  
  socket.on('chat message', function(msg){
    console.log('message: ' + msg);
    io.emit('chat message', msg);
 
  });
});

http.listen(port, function(){
  console.log('listening on *:'+port);
});