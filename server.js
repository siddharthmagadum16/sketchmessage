const http = require('http');
const io = require('socket.io');
const static = require('node-static');

let server = new static.Server('./');

const port = process.env.PORT || 5000;

let httpServer = http.createServer(function(req, res) {
  server.serve(req, res);
})

httpServer.listen(port);
let listener = io.listen(httpServer);

listener.sockets.on('connection', function(socket) { 
  socket.on('mouse',function(data) {
    listener.emit('mouse', data );
  });
})
