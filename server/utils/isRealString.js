//(
let isRealString = (str)=>{
    return typeof str === 'string' && str.trim().length > 0//gets ride of leading and rear spaces
}
module.exports = {isRealString}