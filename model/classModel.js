const mongoose = require('mongoose')
const Schema = mongoose.Schema

const classSchema = new Schema({
    name : {
        type : String,
    },
    schoolId : {
        type : mongoose.Schema.ObjectId
    },
    userId : {
        type : mongoose.Schema.ObjectId
    },
    
},{
    timestamps : true
}
)

const Class = mongoose.model("Class", classSchema)
module.exports = Class