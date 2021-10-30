const http = require('http')
const io = require('socket.io')(http)
const static = require('node-static')

let server = new static.Server('./')

const port = process.env.PORT || 3000

let httpServer = http.createServer((req, res) => {
  server.serve(req, res)
})

httpServer.listen(port)
let listener = io.listen(httpServer)

listener.sockets.on('connection', (socket) => {
  socket.on('mouse', function (data) {
    listener.emit('mouse', data)
  })
})
