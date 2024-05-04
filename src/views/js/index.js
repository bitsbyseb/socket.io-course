const chat = document.getElementById('chat');
const namespaceTitle = document.getElementById('namespace');


const user = prompt("write your username");
const teachers = ["Sebastian", "GNDX", "JuanDC", "RetaxMaster"];

let socketNamespace, group;

if (teachers.includes(user)) {
    socketNamespace = io("/teachers");
    group = "teachers";
} else {
    socketNamespace = io("/students");
    group = "students";
}

socketNamespace.on("connect", () => {
    namespaceTitle.textContent = group;
});

// messages logic
const sendMessageButton = document.getElementById('sendMessage');
sendMessageButton.addEventListener('click', (e) => {
    e.preventDefault();
    const msg = prompt("write your message");
    socketNamespace.emit("sendMessage", {
        user,
        msg: msg ?? "nothing"
    });
});

socketNamespace.on('sendMessage', data => {
    const { user, msg } = data;

    const liElement = document.createElement('li');
    const userName = document.createElement('span');
    userName.textContent = `${user}:`;
    userName.style.fontWeight = "bold";

    const msgContent = document.createElement('p');
    msgContent.textContent = msg;

    liElement.append(userName, msgContent);

    chat.appendChild(liElement);
});