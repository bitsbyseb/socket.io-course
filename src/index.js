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
    socket.on('posY',(posY) => {
        socket.broadcast.emit('posY',posY);
    });
    
    socket.on('posX',(posX) => {
        socket.broadcast.emit('posX',posX);
    });
});

httpServer.listen(3000, '127.0.0.1', () => {
    console.log(`Server started at http://127.0.0.1:3000`);
});