var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

var port = process.env.PORT || 3000;

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

//res.SendFile("/audio/1.mp3")
app.use(express.static('audio'));

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
  console.log('listening on *:'+ app.get('port') );
});