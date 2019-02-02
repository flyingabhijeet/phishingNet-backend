const mongoose = require('mongoose');

var reportSchema = new mongoose.Schema({
    companyName:{
        type:String
    },
    companyLink:{
        type:String
    },
    report:[{
        category:{
            type:String
        },
        description:{
            type:String
        },
        reportedBy:{
            type:String
        }
    }],
    date:{
        type:String,
        default:new Date()
    }
});

var reportModel = mongoose.model('report',reportSchema);

module.exports = {reportModel};