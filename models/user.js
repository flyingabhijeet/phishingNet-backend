const mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
    userName:{
        type:String
    },
    firstName:{
        type:String
    },
    lastName:{
        type:String
    },
    email:{
        type:String
    },
    aadhar:{
        type:Number
    },
    phone:{
        type:Number
    },
    loggedIn:{
        type:Boolean,
        defualt:true
    }
});

var userModel = mongoose.model('user',userSchema);

module.exports = {userModel};