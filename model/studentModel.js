const mongoose = require('mongoose')
const Schema = mongoose.Schema

const studentSchema = new Schema({
    name : {
        type : String,
        required : [true,"userName must be provided"]
    },
    classId : {
        type : mongoose.Schema.ObjectId
    },
    schoolId : {
        type : mongoose.Schema.ObjectId
    },
    
},{
    timestamps : true
}
)

const Student = mongoose.model("Student", studentSchema)
module.exports = Student