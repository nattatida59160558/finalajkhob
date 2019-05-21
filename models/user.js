const mongoose = require('mongoose')

const Schema = mongoose.Schema;

var User = new Schema ({
    username : {
        type : String
    },
    password : {
        type : String
    },
    prefixName : String ,
    firstName : String ,
    lastName : String,
    uType : {
        type : String
    },
    examination : [{
        type : Schema.Types.ObjectId ,
        ref : 'modelExam'
    }]
},{
    collection : 'person'
})

module.exports = mongoose.model('User', User);