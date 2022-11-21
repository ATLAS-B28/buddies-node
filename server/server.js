require('dotenv').config()
const express = require('express')
const app = express()
const socketIO = require('socket.io')
//create our own server using http
const http = require('http')
//simplify using path
const path = require('path')
const publicpath = path.join(__dirname,"/../public")
const port = process.env.PORT || 3000
let server = http.createServer(app)//create an instance
let io = socketIO(server)
app.use(express.static(publicpath))
io.on("connection",(socket)=>{
  console.log("New user connected");
  //we can have custom event names
  //sent this to the frontend
  //socket.emit('newMessage',{
    //from:"Aranyaka",
    //text:"yeah bro !"
  //})
  //everybody gets welcome message initially
  socket.emit('newMessage',{
    from:"Admin",
    text:"hello and welcome to the buddies",
    createdAt: new Date().getTime()
})
//everybody gets welcome message initially
//boradcasting a message to new user and telling others about the new user
socket.broadcast.emit('newMessage',{
    from:"Admin",
    text:"new user joined",
    createdAt: new Date().getTime()
})
  //we get this from the backend
  socket.on('createMessage',(message)=>{
    console.log("creating message",message);
    
    //here we use io to broadcast
    io.emit('newMessage',{
        from:message.from,
        text:message.text,
        createdAt:new Date().getTime()//sending stuff to backend
    })//create an event in the inspect console and we get boradcast
    //boradcasting a message to new user and telling others about the new user
   // socket.broadcast.emit('newMessage',{
     //        from:message.from,
       //       text:message.text,
         //     createdAt:new Date().getTime()//sending stuff to backend
    //})//only to other than the one sending

  })
  socket.on('disconnect',(socket)=>{
    console.log('User disconnected')
  })
})

server.listen(port,()=>{
    console.log(`Server is running on port ${port}...`)
})