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



app.use("/api",authRoute)
app.use("/api/school",schoolRoute)


const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});