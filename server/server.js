require('dotenv').config()
const express = require('express')
const app = express()
const socketIO = require('socket.io')
const {generateMessage,generateLocationMap} = require('./utils/message')
//create our own server using http
const http = require('http')
//simplify using path
const path = require('path')
const publicpath = path.join(__dirname,"/../public")
const {isRealString} = require('./utils/isRealString')
const port = process.env.PORT || 3000
let server = http.createServer(app)//create an instance
let io = socketIO(server)
app.use(express.static(publicpath))
io.on("connection",(socket)=>{
  console.log("New user connected");
  //we send to all as they join initially

  socket.emit('new',generateMessage('Admin','Welcome to buddies!!!'))
  //now to notify others of the new user joining
  socket.broadcast.emit('new',generateMessage('Admin','A newUser joined buddies!!!'))
  //listen to the join
  socket.on('join',(params,callback)=>{
    //doing validation 
    //to avoid spaces
    if(!isRealString(params.name) || !isRealString(params.room)){
         //have a callback
         callback('User name and room name required')
    }
    //for rooms
    socket.join('params.room')
    callback()
  })
  //get meassge from the frontend
  socket.on('create',(message ,callback)=>{
      console.log('create',message)
      //any tine someone creates the message we send it to all of others
      io.emit('new',generateMessage(message.from,message.text))
      callback('This is the server')
  })
  //geolocation is being listiened here
  socket.on('createLocation',(coords)=>{
    io.emit('newLocation',generateLocationMap('Admin',coords.lat,coords.log))
  })
  socket.on('disconnect',(socket)=>{
    console.log('User disconnected')
  })
})

server.listen(port,()=>{
    console.log(`Server is running on port ${port}...`)
})