const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const io = require('socket.io')(server, {cors:{origin:"*"}})

const users = {}

io.on('connection', socket => {
    socket.on('send-chat-message', message => {
        socket.broadcast.emit('chat-message', message.user+": "+message.Message)
    })
    socket.on('new-user', usrName =>{
        users[socket.id] = usrName
        socket.broadcast.emit('user-connected', usrName)
    })
})

server.listen(3000, () => {

})

function appendMessage(message){
    const messageElement = document.createElement('div')
    messageElement.innerText = message
    messageSpace.append(messageElement)
}