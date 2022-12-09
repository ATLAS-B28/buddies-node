const {expect} = require('expect')
const {User} = require('./users')
describe('User',()=>{
    let users
    beforeEach(()=>{
        //create data
        users = new User()
        users.users = [
        {
            id:'1',
            name:'Aditya',
            room:'Parks and Recreation'   
        },
        {
            id:'2',
            name:'Lesli',
            room:'Parks and Recreation'   
        },
        {
            id:'3',
            name:'Jim',
            room:'The Office'   
        }
    ]
    })//runs before every test
    it('should add new user',()=>{
        
        //create variable for instance of class
        let users = new User()
        let user = {
            id:'yoyo',
            name:'Aditya',
            room:'Parks and Recreation'   
        }

        let resUser = users.addUser(user.id,user.name,user.room)
        //expectations
        expect(users.users).toEqual([user])//we are accessing the users array from the users instance
    })

    it('should return names for parks and recreation',()=>{
        let userList = users.getUserList('Parks and Recreation')
        //after getting list
        expect(userList).toEqual(['Aditya','Lesli'])
    })
    it('should return names for the office',()=>{
        let userList = users.getUserList('The Office')
        //after getting list
        expect(userList).toEqual(['Jim'])
    })
    it('should find user by id',()=>{
         let userId = '2'
         let user = users.getOneUser(userId)
         expect(user.id).toBe(userId)
    })
    it('should not find user by id',()=>{
        let userId = '100'
        let user = users.getOneUser(userId)
        expect(user).toBeUndefined()
   })
    it('should remove a user',()=>{
        let userId = '3'
        let user = users.removeUser(userId)
        expect(user.id).toBe(userId)
        expect(users.users.length).toBe(2)
    })
    it('should not remove a user',()=>{
        let userId = '100'
        let user = users.removeUser(userId)
        expect(user).toBeUndefined()
        expect(users.users.length).toBe(3)
    })
})