import express from 'express';
import {createServer} from 'node:http';
import { join } from 'node:path';
import {Server} from 'socket.io';

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer);

app.use(express.static(join(import.meta.dirname,"views")))

app.get('/',(req,res) => {
    res.sendFile(join(import.meta.dirname,"views","index.html"))
});

io.on("connection",socket => {
    /**  emitting events, this will execute just when the client
     connect to the server */
    socket.emit("welcome","and now, you're connected");

    // emitting to all clients
    io.emit("everyone",socket.id + "is connected")

    console.log("clients connected: "+ io.engine.clientsCount);
    
    socket.on('disconnect',() => {
        console.log(`${socket.id} have been disconnected`);
    });
    
    socket.on("ping",(e) => {
        console.log(e);
        socket.emit("hello","world");
    });

    socket.on('reconnect',()=> {
        console.log(`the client ${socket.id} is reconnected`);
    });

    socket.conn.once('upgrade',() => {
        console.log(`%cwe have switched from http long-polling to web sockets, current transport:${socket.conn.transport.name}`,"color:gray;font-weight:bold;font-family:system-ui;font-size:2rem;");
    });
});

let host = '127.0.0.1';
let port = 3000;

httpServer.listen(port,host,()=> {
    console.log(`Server started at https://${host}:${port}`);
});