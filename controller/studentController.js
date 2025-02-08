const Student = require("../model/studentModel")

exports.addStudent = async(req,res)=>{
    const {schoolId,classId} = req.params
    const {name} = req.body 


    if(!name || !schoolId || !classId) {
        return res.status(400).json({
            message : "Please provide name,schoolId, classId"
        })
    }

    const response = await Student.create({
        name,
        schoolId,
        classId

    })
    res.status(200).json({
        message : "Student added successfully",
        data : response
    })

}

exports.getClassStudent = async(req,res)=>{
    const {schoolId, classId} = req.params

    if(!schoolId || !classId){
        return res.status(400).json({
            message : "Please provide schoolId and ClassId"
        })
    }

    const response = await Student.find(
        {
            classId,
            schoolId
        })
        .populate({
            path:"classId", 
            model : "Class",
            select : "-createdAt -updatedAt -__v"
        }) 
        .populate({
            path:"schoolId",
            model : "School",
            select : "-createdAt -updatedAt -__v "
        }) 

    //console.log(response)

    if(response.length == 0){
        return res.status(404).json({
            message : "No student found"
        })
    }
   // console.log(finalResponse)
    res.status(200).json({
        message : "Student fetched successfully",
        data : response 
    })

    


}

exports.getAllStudent = async(req,res)=>{



    const response = await Student.find()
        .populate({
            path:"classId", 
            model : "Class",
            select : "-createdAt -updatedAt -__v"
        }) 
        .populate({
            path:"schoolId",
            model : "School",
            select : "-createdAt -updatedAt -__v "
        }) 

    //console.log(response)

    if(response.length == 0){
        return res.status(404).json({
            message : "No student found"
        })
    }
   // console.log(finalResponse)
    res.status(200).json({
        message : "Student fetched successfully",
        data : response 
    })

    


}