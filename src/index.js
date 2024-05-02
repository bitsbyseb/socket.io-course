import express from 'express';
import { createServer } from 'node:http';
import { join } from 'node:path';
import { Server } from 'socket.io';

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer);

app.use(express.static(join(import.meta.dirname, "views")))

app.get('/', (req, res) => {
    res.sendFile(join(import.meta.dirname, "views", "index.html"))
});

io.on("connection", socket => {
    socket.connectedRoom = "";

    socket.on('connectRoom',(roomName)=> {
        socket.leave(socket.connectedRoom);
        socket.join(roomName);
        socket.connectedRoom = roomName;
    });

    socket.on('message',(msg) => {
        io.to(socket.connectedRoom).emit('message',{
            msg,
            room:socket.connectedRoom,
        });
    });
});

httpServer.listen(3000, '127.0.0.1', () => {
    console.log(`Server started at http://127.0.0.1:3000`);
});