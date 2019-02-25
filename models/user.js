const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    googleId:{
        type:String,
        default:'none'
    },
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
        
    },
    phone:{
        type:Number,
        required:true
                
    },
    college:{
        type:String,
        required:true
        
    },
    date:{
        type:Date,
        default:Date.now
    }

});

const User = new mongoose.model('User',userSchema);

module.exports = User;