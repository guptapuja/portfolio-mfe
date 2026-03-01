const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');

const app = express();
app.use(cors());

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: ["https://lumina-dashboard-shell.pages.dev", "https://7b30e9b9.lumina-chat-remote.pages.dev"],
    methods: ["GET", "POST"]
  }
});

io.on('connection', (socket) => {
  console.log('A user connected');

  socket.on('send_message', (data) => {
    // Broadcast to everyone including the sender
    io.emit('receive_message', data);
  });
});

server.listen(3003, () => console.log('Socket Server running on port 3003'));