const moment = require("moment")

let generateMessage = (from , text)=>{
   return {
    from,
    text,//es6
    createdAt:moment().valueOf()
   }
}
let generateLocationMap = (from,lat,log)=>{
   //return an object
   return {
      from,
      url:`https://www.google.com/maps?q=${lat},${log}`,
      createdAt: moment().valueOf()
   }
}
module.exports = {generateMessage,generateLocationMap}