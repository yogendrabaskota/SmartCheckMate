const mongoose = require('mongoose')
const Schema = mongoose.Schema

const schoolSchema = new Schema({
    name : {
        type : String,
        required : [true,"userName must be provided"]
    },
    address : {
        type : String
    },

    userId : {
        type : mongoose.Schema.ObjectId
    },
    
},{
    timestamps : true
}
)

const School = mongoose.model("School", schoolSchema)
module.exports = School