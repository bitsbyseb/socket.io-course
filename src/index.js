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

const teachers = io.of('teachers');
const students = io.of('students');

teachers.on('connection',socket => {
    console.log(socket.id + " is a teacher");

    socket.on('sendMessage',(data) => {
        teachers.emit("sendMessage",data);
    });
});

students.on('connection',socket => {
    console.log(socket.id + " is a student");

    socket.on('sendMessage',data => {
        students.emit("sendMessage",data);
    });
});

httpServer.listen(3000, '127.0.0.1', () => {
    console.log(`Server started at http://127.0.0.1:3000`);
});