const socket = io('http://localhost:8000')

const form = document.getElementById('send-container');
const message = document.getElementById('messageInp');
const msgContainer = document.querySelector(".container");

const audio = new Audio('ting.mp3');

let name;
do{
 name = prompt("Enter name to join chat with user hahaha");
} while(!name)


socket.emit('new-user-joined',name);

const append = (message,position)=>{
    const myElement = document.createElement('div');
    myElement.innerText = message;
    myElement.classList.add('message');
    myElement.classList.add(position);
    msgContainer.append(myElement);
    if(position == 'left')
    audio.play();
}

socket.on('user-joined',(name) => {
    append(`${name} joined the chat`,'right');
    scrollToBottom();
});


form.addEventListener('submit',(e)=>{
    e.preventDefault();
    const messageInp = message.value;
    if(messageInp != ""){
    append(`You: ${messageInp}`,'right');
    socket.emit('send',messageInp);
    message.value = "";
    scrollToBottom();
  }
})

socket.on('receive',data => {
    append(`${data.name}:\n ${data.message}`,'left');
    scrollToBottom();
});

socket.on('left',name=>{
    append(`${name} left the chat`,'right');
    scrollToBottom();
})

function scrollToBottom() {
    msgContainer.scrollTop = msgContainer.scrollHeight;
}
