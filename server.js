require('dotenv').config();
const express = require('express');
const cors = require('cors');
const http = require('http');
const app = express();
const port = 3001;


const server = http.createServer(app);
const configureSocket = require('./sockets/index');
const socketPort = 3002;

const io = configureSocket(server);


app.use(express.static('public'))
  .use(cors("*"))

  .get('/api', (req, res) => {
    res.send('Hello World!');
  })


app.listen(port, () => {
  console.log("Server is running on port " + port);
});

io.listen(socketPort, () => {
  console.log('Socket.IO server running on port ' + socketPort);
});


module.exports = app;