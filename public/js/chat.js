let socket = io()///requests from the backend
//create a function
function scrollBottom(){
  let messages = document.querySelector('#messages').lastElementChild
  messages.scrollIntoView()//last message which is last li element and scroll it into the view
}
socket.on("connect",()=>{
 console.log('connected to server');
 //to create rooms 

 let searchQuery = window.location.search.substring(1)
 let params = JSON.parse('{"'+ decodeURI(searchQuery).replace(/&/g, '","').replace(/\+/g,' ').replace(/=/g,'":"') + '"}')
 //we emit it ot backend with predefined join 
 socket.emit('join',params,(err)=>{
  if(err){
    alert(err)
    //if that happens then using href property we overwrite the link to homepage
    window.location.href = '/'
  }else{
    console.log('No Error')
  }
 })
})
//to disconnect
socket.on('disconnect',()=>{
 console.log('Disconnected from the server');
})
socket.on('updateUsersList',(users)=>{
  //ordered list of users
  let ol = document.createElement('ol')
  //loop through the array
  users.forEach((user)=>{
    let li = document.createElement('li')
    li.innerHTML = user//it is a name
    //append
    ol.appendChild(li)

  })
  //append ol to user list
  let usersList = document.querySelector('#users')
  //empty the list first
  usersList.innerHTML = ""
  usersList.appendChild(ol)
})
//event name same name as the one in the server
socket.on('new',(message)=>{
  //we input a message and since the message is
  //boardcasted to all but not to use 
  console.log('new message: ',message);
  const formatedTime = moment(message.createdAt).format('LT')
  const template = document.querySelector('#message-template').innerHTML
  //render the things from the script take it to index.html
  const renderHtml = Mustache.render(template,{
    from:message.from,
    text:message.text,
    createdAt:formatedTime
  })//we render template with the data
  //element()
  const div = document.createElement('div')
  div.innerHTML = renderHtml //we set the elemwnt in a proper html
  //append the thing
  document.querySelector('#messages').appendChild(div)
  scrollBottom()
})
//new message geolocation
socket.on('newLocation',(message)=>{

  console.log('new location message: ',message);
  const formatedTime = moment(message.createdAt).format('LT')
  const template = document.querySelector('#location-message-template').innerHTML

  //render the things from the script take it to index.html
  const renderHtml = Mustache.render(template,{
    from:message.from,
    url:message.url,
    createdAt:formatedTime
  })
  const div = document.createElement('div')
  div.innerHTML = renderHtml
  document.querySelector('#messages').appendChild(div)
  scrollBottom()
})

//to prevent refresh and grab the input
document.querySelector('#submit-btn')
.addEventListener('click',(e)=>{
  e.preventDefault()
  socket.emit("create",{
    //data we create is
   
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