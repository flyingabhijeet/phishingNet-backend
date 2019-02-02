const express = require('express');
const router = express.Router();
const _ = require('lodash');
const {userModel} = require('./../models/user.js');
const {mongoose} = require('./../mongoose/mongoose-connect');

router.post('/signup',(request,response)=>{
    const user = _.pick(request.body,['userName','firstName','lastName','email','aadhar','phone'])
    console.log('inside');

    var newUser = new userModel({
        userName:user.userName,
        firstName:user.firstName,
        lastName:user.lastName,
        email:user.email,
        aadhar:user.aadhar,
        phone:user.phone
    });

    newUser.save().then((newUser)=>{
        console.log('User sent to database',newUser);
        var loggedIn = newUser.set({loggedIn:true});
        response.status(200).send(loggedIn);
    });

});

router.get('/login/:id',(request,response)=>{
    userModel.findById(request.params.id).then((userFound)=>{
        var loggedIn = userFound.set({loggedIn:true});
        response.status(200).send(loggedIn);
    }).catch((e)=>{
        console.log(e);
        response.status(400).send('Error Getting User');
    });
});

router.patch('/logout/:id',(request,response)=>{
    userModel.findById(request.params.id).then((userFound)=>{
        var loggedIn = userFound.set({loggedIn:false});
        response.status(200).send(loggedIn);
    }).catch((e)=>{
        console.log(e);
        response.status(400).send('Error Getting User');
    });
})

module.exports = router;