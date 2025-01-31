const School = require("../model/schoolModel")

exports.addSchool = async(req,res)=>{
    const {name,address} = req.body 

    const userId = req.user.id 

    if(!name || !address) {
        return res.status(400).json({
            message : "Please provide name and address"
        })
    }
    if(!userId){
        return res.status(400).json({
            message : "You should login"
        })
    }

    const response = await School.create({
        name,
        address,
        userId
    })
    res.status(200).json({
        message : "School created successfully",
        data : response
    })



}

exports.getMySchool = async(req,res)=>{
    const userId = req.user.id 

    const response = await School.findOne({userId})
    //console.log(response)

    if(!response){
        return res.status(404).json({
            message : "No School found"
        })
    }
    res.status(200).json({
        message : "School fetched successfully",
        data : response
    })

    


}