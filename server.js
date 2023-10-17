const express = require('express')
const app = express()
const bcrypt = require('bcrypt')
//const serverInfo = require('./script')

app.use(express.json())
app.use(express.static(__dirname))
app.use(express.urlencoded())
const users = [];

const loginFile = __dirname + '/loginForm.html'

app.get('/users', (req, res) =>{
    res.send(users)
})
app.get('/login', (req, res) =>{
    res.sendFile(loginFile)
})
app.post('/login', (req, res) =>{
    res.send(req.body)
})
app.post('/loadMainUser', async (req, res) =>{
    try{
        const salt = await bcrypt.genSalt()
        const hashedPassword = await bcrypt.hash(req.body.password, salt)
        const user = {name: req.body.name, password: hashedPassword}
        users.push(user)
        res.status(201).send()
    }   
    catch{
        res.status(500).send()
    }
})
app.post('/loadUser', async (req, res) =>{
    try{
        const salt = await bcrypt.genSalt()
        const hashedPassword = await bcrypt.hash(req.body.password, salt)
        const user = {name: req.body.name, password: hashedPassword}
        users.push(user)
        res.status(201).send()
    }   
    catch{
        res.status(500).send()
    }
})
app.post('/checkUser', async (req, res) =>{
    user = users.find(user => user.name === req.body.name)
    if(user == null){
        return res.status(400).send('Cannot find user')
    }
    try {
        if(await bcrypt.compare(req.body.password, user.password)){
            res.send('Succes')
        }
        else{
            res.send('Fail')
        }
    } catch {
        res.status(500).send()
    }
})
app.listen(3000, ()=>{
    console.log("port connected")
})
