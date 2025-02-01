const Attendance = require("../model/attendanceModel")


exports.doAttendance = async(req,res)=>{
    const {classId, studentId, remarks } = req.body

    //console.log(classId)
    //console.log(studentId)
    //console.log(remarks)



    if(!classId || !studentId || !remarks){
        return res.status(400).json({
            message : "Please provide classId, studentId and remarks"
        })

    }

    const findAttendance = await Attendance.find({
        classId,
        studentId
    })
   // console.log(findAttendance)

    if(findAttendance.length > 0){
        return res.status(400).json({
            message : "you already have attendance for this student"
        })
    }

    const response = await Attendance.create({
        classId,
        studentId,
        remarks
    })
    res.status(200).json({
        message : "Attendance marked successfully",
        data : response
    })
}


exports.getAttendance = async(req,res)=>{
    const {classId, studentId} = req.body

    if(!classId || !studentId){
        return res.status(400).json({
            message : "Please provide classId and studeneId",
        })
    }

    const response = await Attendance.find({
        classId,
        studentId
    }).populate({
        path:"classId",
        model : "Class",
        select : "-createdAt -updatedAt -__v -password -phoneNumber"
    }) 
    .populate({
        path:"studentId",
        model : "Student",
        select : "-createdAt -updatedAt -__v "
    }) 




    res.status(200).json({
        message : "Attendance fetched successfully",
        data : response
    })
}