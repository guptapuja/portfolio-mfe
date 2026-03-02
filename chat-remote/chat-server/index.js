// index.js
const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');

const app = express();
app.use(cors());

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    // Add your LOCAL Vite dev URL here
    origin: ["http://localhost:5005", "http://localhost:5173", "https://lumina-dashboard-shell.pages.dev"],
    methods: ["GET", "POST"]
  }
});

io.on('connection', (socket) => {
  console.log('✅ A user connected:', socket.id);

  socket.on('send_message', (data) => {
    console.log('📩 Message received:', data);
    io.emit('receive_message', data);
  });
});

const PORT = process.env.PORT || 3003;
server.listen(PORT, () => console.log(`🚀 Local Server running on http://localhost:${PORT}`));