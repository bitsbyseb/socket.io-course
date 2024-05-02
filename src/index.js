import express from 'express';
import { createServer } from 'node:http';
import { join } from 'node:path';
import { Server } from 'socket.io';

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer);
const socketsList = [];

app.use(express.static(join(import.meta.dirname, "views")))

app.get('/', (req, res) => {
    res.sendFile(join(import.meta.dirname, "views", "index.html"))
});

io.on("connection", socket => {

    socketsList.push(socket.id);

    /**  emitting events, this will execute just when the client
     connect to the server */
    socket.emit("welcome", "and now, you're connected");

    // io.emit("everyone",socket.id + "is connected")

    socket.on('last', (msg) => {
        const lastSocketId = socketsList[socketsList.length - 1];
        io.to(lastSocketId).emit("greeting", msg);
    });

    socket.on('disconnect', () => {
        console.log(`${socket.id} have been disconnected`);
    });

    socket.on('reconnect', () => {
        console.log(`the client ${socket.id} is reconnected`);
    });

    socket.conn.once('upgrade', () => {
        console.log(`%cwe have switched from http long-polling to web sockets, current transport:${socket.conn.transport.name}`, "color:gray;font-weight:bold;font-family:system-ui;font-size:2rem;");
    });


    // on,once,off

    // on
    socket.emit('on', "hello");
    socket.emit('on', "hello");

    socket.emit("once", "message");
    socket.emit("once", "message");

    socket.emit("off", "hi");

    setTimeout(() => {
        socket.emit("off", "hi");
    }, 3000);
});

httpServer.listen(3000, '127.0.0.1', () => {
    console.log(`Server started at http://127.0.0.1:3000`);
});