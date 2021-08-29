const socket = io()
const messageContainer = document.getElementById('message-container')
const messageSpace = document.getElementById('chat-container')
const messageForm = document.getElementById('sent-container')
const messageInput = document.getElementById('message-input')

const usrName = prompt('Enter Nickname:')

appendMessage("You joined")

socket.emit('new-user', usrName)

socket.on('chat-message', data => {
    appendMessage(data)
})

socket.on('user-connected', data=>{
    appendMessage(data + " connected")
})

messageForm.addEventListener('submit', e => {
    e.preventDefault()
    const message = messageInput.value
    socket.emit('send-chat-message', {Message: message, user:usrName})
    messageInput.value = ''
    appendMessage("You: " + message)
})

function appendMessage(message){
    const messageElement = document.createElement('div')
    messageElement.style.cssText = "font-size: 30%; margin-top: 1%;"
    messageElement.innerText = message
    messageSpace.append(messageElement)
    messageElement.scrollIntoView()
}