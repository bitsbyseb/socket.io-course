const socket = io();
const buttons = document.getElementById('buttons');

buttons.addEventListener('click', e => {
    const targetId = e.target.id;
    switch (targetId) {
        case "send":
            if (socket.connected) {
                socket.emit("send", "im connected");
            }
            break;
        case "disconnect":
            socket.disconnect();
            break;
        case "reconnect":
            socket.connect();
            break;
    }
});