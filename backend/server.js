const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');

const app = express();
const server = http.createServer(app);
const PORT = 5000;
const io = socketIo(server, {
  cors: {
    origin: "http://localhost:3000", // Allow frontend origin
    methods: ["GET", "POST"]
  }
});

app.use(cors());

// Handle client connections
io.on('connection', (socket) => {
    console.log('A new user connected');

    // Handle client disconnections
    socket.on('disconnect', () => {
        console.log('A user disconnected');
    });

    // Handle incoming messages from clients
    socket.on('message', (message) => {
        try {
            console.log('Received message:', message);
            // Broadcast the message to all clients
            io.emit('message', message);
        } catch (error) {
            console.error('Error broadcasting message:', error.message);
            // Handle error accordingly, e.g., emit an error event back to the client
            // socket.emit('error', { message: 'An error occurred while broadcasting the message.' });
        }
    });
});

// Start the server and listen for incoming connections
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
