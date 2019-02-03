const express = require('express');
const router = express.Router();
const _ = require('lodash');
const {reportModel} = require('../models/report.js');
const {mongoose} = require('../mongoose/mongoose-connect');
const id = require('./authenticate.js');

console.log(id[1]);

router.post('/',(request,response)=>{
    // console.log(id);
    const report = _.pick(request.body,['companyName','companyLink','report']);
    report.companyName = report.companyName.toLowerCase();
    // report.report.reportedBy = id[1];
    console.log('saved company name is ',report.companyName);
    
    var newReport = new reportModel(report);

    // reportModel.findOne({newReport:report.companyName}).then((reportFound)=>{
    //     if(reportFound){
    //         reportFound.set({
    //             $push:{
    //                 report:{
    //                     catergory:report.report.catergory,
    //                     description:report.report.description,
    //                     reportedBy:report.report.reportedBy
    //                 }
    //             }
    //         })
    //         console.log('No Such previous report.')
    //     }
    // })
    newReport.save().then((report)=>{
        console.log('Report Sent to Database');
        response.status(200).send(report);
    });
    
    console.log(newReport);
});

router.get('/:id',(request,response)=>{
    reportModel.findById(id).then((foundReport)=>{
        if(!foundReport){
           response.status(404).send('No such report found!');             
        }else{
            response.status(200).send(foundReport);
        }
    }).catch((e)=>{
        console.log('Error in getting report',e);
        response.status(400).send('Error getting report');
    });
});

router.patch('/:id',(request,response)=>{

    const myReport = _.pick(request.body,['report']);
    // report.report.reportedBy = id[1];

    reportModel.findByIdAndUpdate(request.params.id).then((reportFound)=>{
        if(reportFound){
            console.log('report found!');
            reportModel.findByIdAndUpdate(request.params.id,
                {$push:{report:myReport.report}}
            ).then((updatedReport)=>{
                console.log('updated',updatedReport);
            })
        }
        else{
            console.log('No Such previous report.')
            response.status(404).send('No Such company reported.');
        }
    }).catch((e)=>{
        console.log('Error in updating report',e);
        response.status(400).send('Error updating report')
    })
    
    // console.log(myReport.report);
});

module.exports = router;