// its not necessary that you create a new variable with
// htmlNode, when you create a new element with id selector,
// the browser create a new global var
const socket = io();
const emitToLast = document.getElementById('emit-to-last');
socket.on('everyone',msg => text.textContent = msg);

socket.on('disconnect',()=> {
    console.log("the next socket have been disconnected",socket.id);
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
});

emitToLast.addEventListener('click',(e) => {
    e.preventDefault();
    socket.emit("last","hello from "+socket.id);
});

socket.on('greeting',(msg)=> {
    text.textContent = msg;
});

// on,once,off
socket.on('on',(_) => {
    console.log("an event that is emitted many times");
});

socket.once('once',() => {
    console.log("there are 2 events but this message gonna appear one time");
});

const listener = () => {
    console.log("the event turn off");
};

socket.on('off',listener);

setTimeout(() => {
    socket.off('off',listener);
}, 2000);