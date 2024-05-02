// its not necessary that you create a new variable with
// htmlNode, when you create a new element with id selector,
// the browser create a new global var
const button = document.getElementById('msg');
const socket = io();
function checkSocketStatus() {
    console.log(`%csocket status: ${socket.connected ? 'connected' : 'disconnected'}`,"color:green;font-family:system-ui;font-size:2rem;font-weight:bold;");
}

socket.on('hello', (e) => {
    console.log(e);
    checkSocketStatus();
});

socket.on('everyone',msg => text.textContent = msg);

socket.on('disconnect',()=> {
    console.log("the next socket have been disconnected",socket.id);
    checkSocketStatus();
});

socket.on('connect_error',()=> {
    console.log("%ci cannot reconnect❌😔","color:white;font-family:system-ui;font-size:2rem;font-weight:bold;");
});

socket.on('welcome',msg => text.textContent = msg);

socket.io.on('reconnect',()=> {
    console.log("%cim back!!✅😀","color:green;font-family:system-ui;font-size:2rem;font-weight:bold;");
});

socket.io.on('reconnect_attempt',()=> {
    console.log("%cim trying to reconnect🧠❔","color:gray;font-family:system-ui;font-size:2rem;font-weight:bold;");
    checkSocketStatus();
});

button.addEventListener('click', () => {
    socket.emit("ping", "pong");
    console.log("ping");
    checkSocketStatus();
});