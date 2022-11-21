require('dotenv').config()
const express = require('express')
const app = express()
//simplify using path
const path = require('path')
const publicpath = path.join(__dirname,"/../public")
const port = process.env.PORT || 3000
app.use(express.static(publicpath))
app.listen(port,()=>{
    console.log(`Server is running on port ${port}...`)
})