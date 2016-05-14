const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);

app.listen(process.env.API_PORT, () => console.log('Listening...'));

app.get('/:contextId/:mode', (req, res) => {
  io.to(req.params.contextId).emit('set', req.params.mode);
  res.send(req.params);
});

io.on('connection', function(socket){
  socket.on('join-room', (room) => {
    socket.join(room);
    console.log('joined', room);
  });
});