const socket = io();
const circle = document.getElementById('circle');

function drag(e) {
    const posX = e.clientX;
    const posY = e.clientY;
    circle.style.top = posY +"px";
    circle.style.left = posX +"px";

    socket.emit('posX',posX);
    socket.emit('posY',posY);
}

socket.on('posY',(Y) => {
    circle.style.top = Y +"px";
});
socket.on('posX',(X) => {
    circle.style.left = X +"px";
});

document.addEventListener('mousedown',e => {
    document.addEventListener('mousemove',drag);
});

document.addEventListener('mouseup',() => {
    document.removeEventListener('mousemove',drag);
});