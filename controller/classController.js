const Class = require("../model/classModel")


exports.addClass = async(req,res)=>{
    const {name} = req.body 
    const userId = req.user.id 
    const schoolId = req.params.schoolId
    //console.log(schoolId)

    if(!name) {
        return res.status(400).json({
            message : "Please provide class name"
        })
    }

    const foundName = await Class.find({name})
    //console.log(foundName)
    if(foundName.length >0 ){
        return res.status(400).json({
            message : "This className already exist!! Please use unique className"
        })
    }


    if(!schoolId){
        return res.status(400).json({
            message : "Please provide schoolId"
        })
    }

    const response = await Class.create({
        name,
        schoolId,
        userId
    })
    res.status(200).json({
        message : "class created successfully",
        data : response
    })
}


exports.getMyClass = async(req,res)=>{
    const userId = req.user.id 
    const schoolId = req.params.schoolId

    const response = await Class.find(
        {
            userId,
            schoolId
        },"-createdAt -updatedAt -__v" )
        // .populate({
        //     path:"userId",
        //     model : "User",
        //     select : "-createdAt -updatedAt -__v -password -phoneNumber"
        // }) 
        .populate({
            path:"schoolId",
            model : "School",
            select : "-createdAt -updatedAt -__v -address"
        }) 

    //console.log(response)

    if(!response){
        return res.status(404).json({
            message : "No class found"
        })
    }
    res.status(200).json({
        message : "class fetched successfully",
        data : response
    })

    


}