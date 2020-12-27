const express = require('express');

const app = express();

const server = app.listen(3333, () => {
  console.log('server running!');
});

const io = require('socket.io')(server);


const history = [];


io.on('connection', (socket) => {
  console.log('Nova Conexão');

  history.forEach(line => {
    socket.emit("draw", line);
  })

  socket.on('draw', (line) => {
    history.push(line);
    io.emit('draw', line);
  });
});

app.use(express.static('./APP/Public'));

app.get('/', (req, res) => {
  res.sendFile('index.html');
});
