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


exports.getSingleClass = async(req,res)=>{
    const {schoolId,classId} = req.params
    console.log(schoolId,classId)

    const response = await Class.find(
        {
            
            schoolId,
            _id: classId
        },"-createdAt -updatedAt -__v" )
        // .populate({
        //     path:"userId",
        //     model : "User",
        //     select : "-createdAt -updatedAt -__v -password -phoneNumber"
        // }) 
        // .populate({
        //     path:"schoolId",
        //     model : "School",
        //     select : "-createdAt -updatedAt -__v -address"
        // }) 

  //  console.log(response)

    if(response.length == 0){
        return res.status(404).json({
            message : "No class found"
        })
    }
    res.status(200).json({
        message : "class fetched successfully",
        data : response
    })

}
exports.deleteClass = async (req, res) => {
    try {
        const { schoolId, classId } = req.params;

        // Check if class exists
        const existingClass = await Class.findOne({ schoolId, _id: classId });
        if (!existingClass) {
            return res.status(404).json({
                message: "Class not found",
            });
        }

        // Delete the class
        await Class.findByIdAndDelete(classId);

        res.status(200).json({
            message: "Class deleted successfully",
        });
    } catch (error) {
        console.error("Error deleting class:", error);
        res.status(500).json({
            message: "Internal server error",
        });
    }
};




exports.editClass = async (req, res) => {
    try {
        const { name } = req.body;
        const { schoolId, classId } = req.params;

        if (!name) {
            return res.status(400).json({
                message: "Please provide class name"
            });
        }

        if (!schoolId || !classId) {
            return res.status(400).json({
                message: "Please provide schoolId and classId"
            });
        }

        // Check if the class with the same name already exists in the same school
        const existingClass = await Class.findOne({ name, schoolId });
      //  console.log("existing class",existingClass)

        if (existingClass) {
            return res.status(400).json({
                message: "This class name already exists! Please use a unique class name"
            });
        }

        // Update the class details
        const updatedClass = await Class.findOneAndUpdate(
            { _id: classId, schoolId },
            { name },
            { new: true }
        );
        //console.log("updated class",updatedClass)

        if (!updatedClass) {
            return res.status(404).json({
                message: "Class not found"
            });
        }

        res.status(200).json({
            message: "Class updated successfully",
            updatedClass
        });
    } catch (error) {
        console.error("Error updating class:", error);
        res.status(500).json({
            message: "Internal server error"
        });
    }
};
