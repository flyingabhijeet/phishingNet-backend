const express = require('express');
const router = express.Router();
const _ = require('lodash');
const {userModel} = require('./../models/user.js');
const {mongoose} = require('./../mongoose/mongoose-connect');
var id;

router.post('/signup',(request,response)=>{
    const user = _.pick(request.body,['userName','email','aadhar','phone'])
    console.log('inside');

    var newUser = new userModel({
        userName:user.userName,
        email:user.email,
        aadhar:user.aadhar,
        phone:user.phone,
        loggedIn:true
    });

    newUser.save().then((newUser)=>{
        id = newUser._id;
        console.log('id to send is',id);
        console.log('User sent to database',newUser);
        var loggedIn = newUser.set({loggedIn:true});
        request.user = newUser;
        response.status(200).send(loggedIn);
    });


});

router.get('/login/:id',(request,response)=>{
    userModel.findById(request.params.id).then((userFound)=>{
        id = newUser._id;
        console.log('id to send is',id);
        var loggedIn = userFound.set({loggedIn:true});
        request.user = newUser;
        response.status(200).send(loggedIn);
    }).catch((e)=>{
        console.log(e);
        response.status(400).send('Error Getting User');
    });
});

router.patch('/logout/:id',(request,response)=>{
    userModel.findById(request.params.id).then((userFound)=>{
        id = null;
        console.log('id to send is',id);
        var loggedIn = userFound.set({loggedIn:false});
        request.user = null;
        response.status(200).send(loggedIn);
    }).catch((e)=>{
        console.log(e);
        response.status(400).send('Error Getting User');
        console.log('final id is',id);
    });
})


module.exports = [router,id];