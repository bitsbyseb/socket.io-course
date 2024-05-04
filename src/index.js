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

// middleware error type
io.use((socket,next) => {
    const token = socket.handshake.auth.token;
    
    if (token == "mortarion") {
        next();
    } else {
        const err = new Error("you're not allowed");
        err.data = {
            details:"you couldn't be authenticated by our service"
        };
        next(err);
    }
});

io.on('connection',socket => {
    console.log(socket.id+" is an authenticated user");
});

httpServer.listen(3000, '127.0.0.1', () => {
    console.log(`Server started at http://127.0.0.1:3000`);
});