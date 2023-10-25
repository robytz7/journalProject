const express = require('express')
const app = express()
const bcrypt = require('bcrypt')
const mongoose = require('mongoose')
const fs = require('fs')
const userInfo = require('./models/information')

const dbUri = 'mongodb+srv://robertandrusca12:Converser123@cluster0.ab7khv0.mongodb.net/users-information?retryWrites=true&w=majority'
async function connect(){
    try{
        await mongoose.connect(dbUri)
        console.log('connected to mongoDb')
    }
    catch(error){
        console.error(error)
    }
}

connect()

app.use(express.json())
app.use(express.static(__dirname))
app.use(express.urlencoded())

let users = []
let aux = []
const mainUser = {
    name : "Robert", 
    password: "password"
}

const loginFile = __dirname + '/loginForm.html'
const firstFile = __dirname + '/firstFile.html'
const createAccount = __dirname + '/createAccount.html'

app.get('/', (req, res) =>{
    res.sendFile(firstFile)
})
//#region createAccount
app.get('/createAccount', (req, res) =>{
    res.sendFile(createAccount)
})
app.post('/createAccount', (req, res)=>{

    const userInfoCache = new userInfo({
        user: req.body.name,
        journal: req.body.name + " informationForJournal",
        mementos: req.body.name + " mementos",
        body: req.body.name + " body"
    })

    userInfoCache.save()

    fs.appendFile('test.txt', req.body.name + "\n" + req.body.password + "\n", err =>{
        if(err){
            console.err
            return
        }
    })
    res.sendFile(loginFile)
})
//#endregion

//#region login
app.get('/login', (req, res) =>{
    res.sendFile(loginFile)
})
app.post('/login', (req, res) =>{

    fs.readFile('test.txt', 'utf8', (err, data) =>{
        if(err){
            console.error(err)
            return
        }
        aux = data.split("\n")
        for(let i = 0; i < aux.length && aux[i] != ''; i += 2){
            const user = {name: null, password: null}
            user.name = aux[i]
            user.password = aux[i + 1]
            users.push(user)
        }
    })

    control = 0
    for(let i = 0; i < users.length; i++){
        if(req.body.name === users[i].name && req.body.password === users[i].password){
            control = 1
            res.send('Login succesful')
        }
    }
    if(control == 0)
        res.send('Login unsuccesful')
})
//#endregion

//#region testing
app.get('/users', (req, res) =>{
    res.send('Users in the console')
    console.log(users[3])
})
//#endregion

//#region testingForUser
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
    const user = users.find(user => user.name === req.body.name)
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
//#endregion

app.listen(3000, ()=>{
    console.log("port connected")
})