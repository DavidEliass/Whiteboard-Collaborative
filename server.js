const express = require('express');

const app = express();

const server = app.listen(3333, () => {
  console.log('server running!');
});

const io = require('socket.io')(server);

io.on('connection', (socket) => {
  console.log('Nova Conexão');
});

app.use(express.static('./APP/Public'));

app.get('/', (req, res) => {
  res.sendFile('index.html');
});
