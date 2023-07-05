const mongoose = require('mongoose');
const validator = require('validator')

const UserSchema = mongoose.Schema({
    name : {
        type : String
    },
    email : {
        type : String,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error('Email is invalid')
            }
        }
    },
    password : {
        type : String,
        validate(value) {
            if(value.toLowerCase().includes('pass')) {
                throw new Error('Password cannot contain the word "pass".')
            }
        }
    },
    age : {
        type : Number,
        default : 0
    }
})

const User = mongoose.model("User", UserSchema)

module.exports = User