const express = require('express');
const router = express.Router();
const {reportModel} = require('./../models/report.js');
const dictionary = require('dictionary-en-us');
const nspell = require('nspell');
const mongoose = require('./../mongoose/mongoose-connect.js');

//put code on stackoverflow
router.get('/:word',(request,response)=>{
    reportModel.find({ $text: {
         $search: request.params.word,
         $caseSensitive: false
        } 
    }).then((foundReport)=>{
        console.log(foundReport);
        if(foundReport.length==0){
            response.status(404).send('No Such Report Exists!');
        }else{
            response.status(200).send(foundReport);
        }
    }).catch((e)=>{
        console.log(e);
        response.status(400).send('Error Searching Reports');
    });
})


module.exports = router;
