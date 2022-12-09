//to define the users
//array of objects representing the users
//and their id is socket.id and name and room they joined
class User{
    constructor(){
       this.users = [] 
    }
    addUser(id,name,room){
        let user = {id,name,room}
        this.users.push(user)
        return user
    }
    getUserList(room){
        let users = this.users.filter(user=> user.room === room)
        let nameArray = users.map(user => user.name)
        return nameArray
    }
    getOneUser(id){
        //using the socket id
        return this.users.filter(user => user.id === id)[0]//get the 1st instance of the id
    }
    removeUser(id){
        let user = this.getOneUser(id)
        if(user){
            this.users = this.users.filter(user => user.id !== id)
            //the ids that donot match the id to be removed we pass them in this array
        }
        return user
    }
}
module.exports = {User}