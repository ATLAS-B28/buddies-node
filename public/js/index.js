let socket = io()///requests from the backend
socket.on("connect",()=>{
 console.log('connected to server');


})
//to disconnect
socket.on('disconnect',()=>{
 console.log('Disconnected from the server');
})
//event name same name as the one in the server
socket.on('new',(message)=>{
  //we input a message and since the message is
  //boardcasted to all but not to use 
  console.log('new message: ',message);
  const formatedTime = moment(message.createdAt).format('LT')
  let li = document.createElement('li')
  li.innerText = `${message.from} ${formatedTime}: ${message.text}`
  document.querySelector('body').appendChild(li)
})
//new message geolocation
socket.on('newLocation',(message)=>{
  //we input a message and since the message is
  //boardcasted to all but not to use 
  console.log('new location message: ',message);
  let li = document.createElement('li')
  let  a = document.createElement('a')
  a.setAttribute('target','_link')
  a.setAttribute('href',message.url)
  a.innerText = 'My Current Location'
  
  li.appendChild(a)
  document.querySelector('body').appendChild(li)
})

//to prevent refresh and grab the input
document.querySelector('#submit-btn')
.addEventListener('click',(e)=>{
  e.preventDefault()
  socket.emit("create",{
    //data we create is
    from:'User',
    text:document.querySelector('input[name="message"]').value
  },function(){

  })
})
//geolocation 
document.querySelector('#send-location').addEventListener('click',
function(e){
  e.preventDefault()
  //check whether browser has geolocation or not
  if(!navigator.geolocation){
     console.log('geolocation not supported')
  }
  //if supported
  //get the location
  navigator.geolocation.getCurrentPosition(
    function(position){
     //crerate event for socket
     socket.emit('createLocation',{
      lat:position.coords.latitude,
      log:position.coords.longitude
     })
    },
    ()=>{
      //if not found locatiom
      console.log('Unable to fetch location')
    }
  )//takes 2 functions
})