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
    });
})


module.exports = router;
