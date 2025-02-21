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

    const totalSchool = await School.find({userId})
    console.log(totalSchool.length)


    if(totalSchool.length > 2){
        return res.status(301).json({
            message : "Please proceed to payment to add more school"
        })
    }
    

    const foundName = await School.find({name})
    //console.log(foundName[0])
    if(foundName[0]){
        return res.status(400).json({
            message : "This School Name already exist!! Please use unique School Name"
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

    const response = await School.find({userId},"-createdAt -updatedAt -__v" )
    // .populate({
    //     path:"userId",
    //     model : "User",
    //     select : "-createdAt -updatedAt -__v -password -phoneNumber"
    // }) 
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

exports.getSingleSchool = async(req,res)=>{
    const userId = req.user.id 
    const {schoolId} = req.params

    const response = await School.findById(schoolId)
    // .populate({
    //     path:"userId",
    //     model : "User",
    //     select : "-createdAt -updatedAt -__v -password -phoneNumber"
    // }) 
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

exports.editSchool = async (req, res) => {
    const { name, address } = req.body;
    const { schoolId } = req.params;
    const userId = req.user.id;

    if (!userId) {
        return res.status(400).json({
            message: "You should login",
        });
    }

    const updatedData = {};
    if (name) updatedData.name = name;
    if (address) updatedData.address = address;

    try {
        const updatedSchool = await School.findOneAndUpdate(
            { _id: schoolId, userId }, // Ensuring the user owns the school
            { $set: updatedData },
            { new: true } // Return the updated document
        );

        if (!updatedSchool) {
            return res.status(404).json({
                message: "School not found or unauthorized",
            });
        }

        res.status(200).json({
            message: "School updated successfully",
            data: updatedSchool,
        });
    } catch (error) {
        res.status(500).json({
            message: "Internal server error",
            error: error.message,
        });
    }
};

