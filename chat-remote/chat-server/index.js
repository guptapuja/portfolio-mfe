const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');

const app = express();
app.use(cors());

const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: "*" } // Allow your Shell (5005) and Chat (5001)
});

io.on('connection', (socket) => {
  console.log('A user connected');

  socket.on('send_message', (data) => {
    // Broadcast to everyone including the sender
    io.emit('receive_message', data);
  });
});

server.listen(3003, () => console.log('Socket Server running on port 3003'));