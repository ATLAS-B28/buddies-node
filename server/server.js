require("dotenv").config();
const express = require("express");
const app = express();
const socketIO = require("socket.io");
const { generateMessage, generateLocationMap } = require("./utils/message");
//create our own server using http
const http = require("http");
//simplify using path
const path = require("path");
const publicpath = path.join(__dirname, "/../public");
const { isRealString } = require("./utils/isRealString");
const { User } = require("./utils/users");
const port = process.env.PORT || 3000;
let server = http.createServer(app); //create an instance
let io = socketIO(server);
//create instance of user
let users = new User();
app.use(express.static(publicpath));
io.on("connection", (socket) => {
  console.log("New user connected");
  //we send to all as they join initially

  //listen to the join
  socket.on("join", (params, callback) => {
    //doing validation
    //to avoid spaces
    if (!isRealString(params.name) || !isRealString(params.room)) {
      //have a callback
      return callback("User name and room name required");
    }
    //we add return so we can break and not allow the user
    socket.join(params.room);
    //if they are in any other room we kick them out if they enter another in
    users.removeUser(socket.id);
    users.addUser(socket.id, params.name, params.room);
    //tell the frontend about the array of users
    io.to(params.room).emit("updateUsersList", users.getUserList(params.room)); //pass the users array

    socket.emit("new", generateMessage("Admin", `Welcome to ${params.room}!`));
    socket.broadcast
      .to(params.room)
      .emit("new", generateMessage("Admin", "New user joined"));
    callback();
  });
  //get meassge from the frontend
  socket.on("create", (message, callback) => {
    //any tine someone creates the message we send it to all of others
    let user = users.getOneUser(socket.id)
    //check if there is a user
    if(user && isRealString(message.text)){
          //if there
          io.to(user.room).emit("new", generateMessage(user.name, message.text));
    }
    
    callback("This is the server");
  });
  //geolocation is being listiened here
  socket.on("createLocation", (coords) => {
    let user = users.getOneUser(socket.id)
    if(user){
      io.to(user.room).emit(
        "newLocation",
        generateLocationMap(user.name, coords.lat, coords.log)
      );
    }
   
  });
  socket.on('disconnect', () => {
    let user = users.removeUser(socket.id);

    if(user){
      io.to(user.room).emit('updateUsersList', users.getUserList(user.room));
      io.to(user.room).emit('new', generateMessage('Admin', `${user.name} has left ${user.room} chat room.`))
    }
  });
});

server.listen(port, () => {
  console.log(`Server is running on port ${port}...`);
});
