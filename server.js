const httpServer = require("http").createServer();
const io = require("socket.io")(httpServer, {
  // ...
});

httpServer.listen(3000);

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
function appendMessage(message){
    const messageElement = document.createElement('div')
    messageElement.innerText = message
    messageSpace.append(messageElement)
}