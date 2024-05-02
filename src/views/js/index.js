const chat = document.getElementById('chat');
const namespaceTitle = document.getElementById('namespace');
const sendMessageButton = document.getElementById('sendMessage');


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

socketNamespace.on("connect",() => {
    namespaceTitle.textContent = group;
})