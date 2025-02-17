const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
    email : {
        type : String,
        required : [true, 'userEmail must be provided'],
        unique : true,
        lowercase : true
    },
    name : {
        type : String,
        required : [true,"userName must be provided"]
    },
    phoneNumber : {
        type : String,
        required : [true, 'userPhoneNumber must be provided']
   
    },

    password : {
        type : String,
        required : [true,'userPasssword must be provided'],
       // select : false,
        minlength : 8
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

const User = mongoose.model("User", userSchema)
module.exports = User