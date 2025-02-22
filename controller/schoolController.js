const School = require("../model/schoolModel")

exports.addSchool = async (req, res) => {
    const { name, address } = req.body;
    const userId = req.user.id;

    if (!name || !address) {
        return res.status(400).json({
            message: "Please provide name and address",
        });
    }
    if (!userId) {
        return res.status(400).json({
            message: "You should login",
        });
    }

    // Check if the school name already exists first
    const existingSchool = await School.findOne({ name });
    if (existingSchool) {
        return res.status(400).json({
            message: "This School Name already exists! Please use a unique School Name.",
        });
    }


    // Get total number of schools registered by the user
    const totalSchools = await School.countDocuments({ userId });
   // console.log("total",totalSchools)

    const checkSchool = await School.find({userId})
   // console.log("checkSchool",checkSchool[checkSchool.length-1])
    if (totalSchools >= 2 && checkSchool[checkSchool.length-1].paymentDetails.status == 'paid'){

        const newSchool = await School.create({
            name,
            address,
            schoolId : userId,
            paymentDetails: {
                status: "pending",
            },
            userId,
        });
    
        return res.status(200).json({
            message: "School created successfully",
            data: newSchool,
        });
    };

     





    if (totalSchools >= 2) {
        return res.status(200).json({
            message: "Payment Required",
            data: { name, address, schoolId : userId} 
        });
    }


    const newSchool = await School.create({
        name,
        address,
        schoolId : userId,
        paymentDetails: {
            status: "pending",
        },
        userId,
    });

    return res.status(200).json({
        message: "School created successfully",
        data: newSchool,
    });
};



// exports.updatePaymentStatus = async (req, res) => {
//     const { schoolId } = req.body; // Get school ID from frontend
//     const userId = req.user.id;

//     const school = await School.findOne({ _id: schoolId, userId });

//     if (!school) {
//         return res.status(404).json({ message: "School not found" });
//     }

//     school.paymentDetails.status = "completed";
//     await school.save();

//     res.status(200).json({ message: "Payment completed successfully", data: school });
// };





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


exports.deleteSchool = async (req, res) => {
    try {
        const { schoolId } = req.params;
        //console.log("schoolId",schoolId)

        // Check if class exists
        const existingSchool = await School.find({ schoolId });
        //console.log("existing school",existingSchool)
        if (!existingSchool) {
            return res.status(404).json({
                message: "School not found",
            });
        }

        // Delete the class
        await School.findByIdAndDelete(schoolId);

        res.status(200).json({
            message: "School deleted successfully",
        });
    } catch (error) {
        console.error("Error deleting School:", error);
        res.status(500).json({
            message: "Internal server error",
        });
    }
};