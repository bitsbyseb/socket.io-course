const socket = io();
const buttons = document.getElementById('buttons');

buttons.addEventListener('click',(e) => {
    if (e.target.id !== undefined) {
        socket.emit('connectRoom',e.target.id);
    }
});

// send a message
const sendMessage = document.getElementById('sendMessage');
sendMessage.addEventListener('click',() => {
    const msg = prompt("write your message");
    socket.emit("message",msg);
});

socket.on('message',data => {
    const {msg,room} = data;
    const ulToWrite = document.querySelector(`#${room}Container`);
    const liEl = document.createElement('li');
    liEl.textContent = msg;
    ulToWrite?.append(liEl);
});