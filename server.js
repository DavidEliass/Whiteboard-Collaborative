const express = require('express');

const app = express();

app.use(express.static('./APP/Public'));

app.get('/', (req, res) => {
  res.sendFile('index.html');
});

app.listen(3333, () => {
  console.log('Servidor rodando!');
});
