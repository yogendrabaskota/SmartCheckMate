const express = require('express');
const { connectDatabase } = require('./database/database');

const app = express()

connectDatabase()

require("dotenv").config()
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/",(req,res)=>{  
    res.status(200).json({
    message : "Backend is Running"
    })
})

const authRoute = require("./route/authRoute")
const schoolRoute = require("./route/schoolRoute")
const classRoute = require("./route/classRoute")
const studentRoute = require("./route/studentRoute")
const attendanceRoute = require("./route/attendanceRoute")



app.use("/api",authRoute)
app.use("/api/school",schoolRoute)
app.use("/api/class",classRoute)
app.use("/api/student",studentRoute)
app.use("/api/student",attendanceRoute)



const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});