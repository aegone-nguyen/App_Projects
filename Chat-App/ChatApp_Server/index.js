const express = require('express');
const http = require('http');
const cors = require('cors');

const router = require('./router');
const {addUser, removedUser, getUser, getUserInRoom} = require('./users')

const app = express();
const server = http.createServer(app);
const io = require("socket.io")(server, {
    cors: {
      origin: "http://localhost:3000",
      methods: ["GET", "POST"]
    }
  });
app.use(cors());
app.use(router);

io.on('connection', (socket) => {
    console.log('We have a new connection sir!!!');

    socket.on('join',({name, room}, callback)=>{
        const {error, user} = addUser({id: socket.id, name, room});

        if (error) {
            return callback(error);
        }

        socket.emit('message', {user: 'admin', text: `Hello ${user.name}, Welcome to room ${user.room}!!`});  //System sẽ ra câu này khi user vừa join vào room
        socket.broadcast.to(user.room).emit('message', {user: 'admin', text: `${user.name} has joined our room!!`}) //System sẽ ra câu này cho tất cả các users còn lại trong room

        socket.join(user.room);
        callback();
    })

    socket.on('sendMessage', (message, callback)=>{
        const user = getUser(socket.id);

        io.to(user.room).emit('message', {user: user.name, text: message});
        
        callback();
    })

    socket.on('disconnect', ()=>{
        console.log('User has left!!!!');
    })
})




server.listen(process.env.PORT || 5000,() => {console.log(`Server has start `)})