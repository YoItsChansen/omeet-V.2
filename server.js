const express = require('express')
const httpServer = require("http").createServer(express);
const io = require("socket.io")(3000)
const users = {}

io.on('connection', socket => {
    console.log("It worked")
    socket.on('send-chat-message', message => {
        socket.broadcast.emit('chat-message', message.user+": "+message.Message)
    })
    socket.on('new-user', usrName =>{
        users[socket.id] = usrName
        socket.broadcast.emit('user-connected', usrName)
    })
})

function appendMessage(message){
    const messageElement = document.createElement('div')
    messageElement.innerText = message
    messageSpace.append(messageElement)
}