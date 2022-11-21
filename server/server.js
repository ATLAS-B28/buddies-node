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
  socket.on('disconnect',(socket)=>{
    console.log('User disconnected')
  })
})

server.listen(port,()=>{
    console.log(`Server is running on port ${port}...`)
})