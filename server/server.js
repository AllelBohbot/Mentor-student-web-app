import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import path from 'path';
import cors from 'cors';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: "http://localhost:3001",
        methods: ["GET", "POST"]
    }
});

app.use(cors());
app.use(express.static(path.join(__dirname, 'client')));

const connectedClients = new Set();
const codeMap = new Map(); // Map to store code changes, my DB
let expectedCode;   //our expected code from each of the code blocks so we can compare to the 'writer'=student code


io.on('connection', (socket) => {
    console.log('A user connected');

    connectedClients.add(socket.id);

    // Broadcast connected clients to all clients
    io.emit('connectedClients', Array.from(connectedClients));

    // Handle code changes
    socket.on('codeChange', (data) => {
        // Save the code change to the map
        codeMap.set(socket.id, data.code);

        // Compare the code to the expected code
        if (data.code === expectedCode) {
            // Emit the message to all connected clients
            io.emit('smiley', { smiley: '😊' });
        }

        // Broadcast the code change to all connected clients
        io.emit('codeChange', data);
    });

    socket.on('setExpectedCode', (data) =>{
        expectedCode = data.expectedCode;
    });

    socket.on('getConnectedClients', () => {
        // Send the list of connected clients to the requester
        socket.emit('connectedClients', Array.from(connectedClients));
    });

    socket.on('disconnect', () => {
        console.log('User disconnected');
        connectedClients.delete(socket.id);
        codeMap.delete(socket.id); // Remove the user's code on disconnect

        // Broadcast updated connected clients list
        io.emit('connectedClients', Array.from(connectedClients));
    });
});

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
    console.log('Server is running on http://localhost:${PORT}');
});
