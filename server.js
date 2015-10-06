var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);

// var Myo = require('myo');

// var myo = Myo.create();

// myo.on('fist', function(){
//   console.log('fist!')
// })

app.use(express.static(__dirname + '/public'));

app.get('/', function(request, response) {
  response.sendFile(__dirname + '/index.html');
});

app.get('/about', function(request, response) {
  response.sendFile(__dirname + '/about.html');
});


io.on('connection', function(client) {
  //client.broadcast.emit('client connected');
  console.log('client connected!')

  client.on('join', function(data) {
    //client.emit(data);
    console.log(data)
  });

  client.on('play', function(data) {
    io.sockets.emit('play', data);
    console.log('server-side data:', data)
  });

});


server.listen(process.env.PORT || 8080);
