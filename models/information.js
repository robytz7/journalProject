const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userInfoSchema = new Schema({
    user:{
        type: String,
        require: true
    },
    journal:{
        type: String,
        required: true,
    },
    mementos:{
        type: String,
        required: true,
    },
    body: {
        type: String,
        required: true 
    }
}, {timestamps: true})

const userInfo = mongoose.model('app-usage-info', userInfoSchema)
module.exports = userInfo



