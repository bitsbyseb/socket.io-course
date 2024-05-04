const socket = io();
const buttons = document.getElementById('buttons');

buttons.addEventListener('click', e => {
    const targetId = e.target.id;
    switch (targetId) {
        case "send":
            /** volatile events
             this event wont send to the server if the client
             is disconnected.
             
             if you don't use volatile events or you don't check
             if the client is connected, all events sent from the 
             client to the server, will arrive and there will a 
             bad performance and you could crash the server*/
            socket.volatile.emit("send", "im connected");
            break;
        case "disconnect":
            socket.disconnect();
            break;
        case "reconnect":
            socket.connect();
            break;
    }
});