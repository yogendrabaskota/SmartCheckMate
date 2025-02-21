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
    schoolId : {
        type : String
    },

    paymentDetails : {
        pidx : {
            type : String
        },
        method : {
            type : String,
            enum : ['Khalti'],
            
        },
        status : {
            type : String,
            enum : ['paid','unpaid','pending'],
            default : 'unpaid'
        }
    }
    
},{
    timestamps : true
}
)

const School = mongoose.model("School", schoolSchema)
module.exports = School