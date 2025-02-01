const mongoose = require('mongoose')
const Schema = mongoose.Schema

const attendanceSchema = new Schema({
    classId : {
        type : mongoose.Schema.ObjectId
    },
    studentId : {
        type : mongoose.Schema.ObjectId
    },
    remarks : {
        type : String,
        enum : ['present','absent']
    }
    
},{
    timestamps : true
}
)

const Attendance = mongoose.model("Attendance", attendanceSchema)
module.exports = Attendance