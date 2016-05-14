const express = require('express');
const server = require('http').Server(app);
const app = express();
const io = require('socket.io')(server);

io.on('connection', function(socket){
  socket.join('some room');
  socket.on('join-room', (room) => {
    socket.join(room);
  });
});

app.get('/:contextId/:mode', (req, res) => {
  io.to(req.params.contextId).emit('set', req.params.mode);
});

server.listen(process.env.API_PORT, () => console.log('Listening...'));