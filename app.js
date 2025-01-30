const express = require('express')

const app = express()

require("dotenv").config()
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.get("/",(req,res)=>{  
    res.status(200).json({
    message : "Backend is Running"
    })
})

const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});