const path = require('path')
const express = require('express')
const helmet = require('helmet')
const cors = require('cors')
const api = require('./routes/api')
const app = express()


app.use(cors({
    origin : 'http://localhost:3000'
}))

app.use(helmet())
app.use(express.json())
app.use(express.static(path.join(__dirname,'..','public')))
app.use('/v1',api)
// app.use('/v2'.v2Router)
app.get('/*', (req,res)=>{
    res.sendFile(path.join(__dirname,'..','public','index.html'))
})

module.exports = app