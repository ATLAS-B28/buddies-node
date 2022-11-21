let socket = io()///requests from the backend
socket.on("connect",()=>{
 console.log('connected to server');
 //we create emit function on connection
 //socket.emit('createMessage',{
    //we send a data object
   // from:"Aditya",
    //text:"Whatsup doc ?!"
    //we send this to backend and reverse this 
 //})//event name same name as the one in the server
})
//to disconnect
socket.on('disconnect',()=>{
 console.log('Disconnected from the server');
})
//event name same name as the one in the server
socket.on('newMessage',(message)=>{
  //this comes from the backend
  console.log('new message: ',message);
})