const mongoose = require("mongoose")
require("dotenv").config()


exports.connectDatabase = async()=>{
await mongoose.connect(process.env.DB_URI)
console.log("Database connected Successfully")


}