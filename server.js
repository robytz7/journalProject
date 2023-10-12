const express = require('express')
const app = express()

app.use(express.json)
const users = [];
const loginFile = __dirname + '/logic.html'
const mainPage = __dirname + '/mainPage.html'

app.get('/', (req, res) =>{
    res.sendFile(mainPage)
})
app.get('/login', (req, res) =>{
    res.sendFile(loginFile)
})

app.listen(3000);