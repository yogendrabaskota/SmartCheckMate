const Attendance = require("../model/attendanceModel")
const moment = require('moment');


exports.doAttendance = async (req, res) => {
    const { studentId, remarks } = req.body;
    const { classId} = req.params

    if (!classId || !studentId || !remarks) {
        return res.status(400).json({
            message: "Please provide classId, studentId, and remarks"
        });
    }


    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Check if an attendance record already exists for today
    const findAttendance = await Attendance.findOne({
        classId,
        studentId,
        createdAt: {
            $gte: today, // Greater than or equal to today's start
            $lt: new Date(today.getTime() + 24 * 60 * 60 * 1000) // Less than tomorrow's start
        }
    });
    //console.log(findAttendance)

    if (findAttendance) {
        return res.status(400).json({
            message: "Attendance for this student has already been marked today"
        });
    }

    // If no attendance for today, create a new one
    const response = await Attendance.create({
        classId,
        studentId,
        remarks,
    })

    res.status(200).json({
        message: "Attendance marked successfully",
        data: response
    });
};


exports.getAttendance = async(req,res)=>{
    const {classId, studentId} = req.params

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
    

    const finalResponse = response.length 
    // if(finalResponse < 1){
    //     return res.status(404).json({
    //         message : "No attendance found"
    //     })
    // }



    res.status(200).json({
        message : "Attendance fetched successfully",
        data: response,
        count : finalResponse
    })
}


exports.getPresentCount = async (req, res) => {
    const { date } = req.params; // Expecting YYYY-MM-DD format
    const {classId} = req.params


    if (!date || !/^\d{4}-\d{2}-\d{2}$/.test(date)) {
        return res.status(400).json({ 
            message: "Invalid date format. Please provide a valid date in YYYY-MM-DD format." 
        });
    }

    try {
        // Convert date to UTC without hardcoding time
        const selectedDate = new Date(date);
        selectedDate.setUTCHours(0, 0, 0, 0);

        const nextDay = new Date(selectedDate);
        nextDay.setUTCDate(nextDay.getUTCDate() + 1);
        nextDay.setUTCHours(0, 0, 0, 0);

        //console.log("Selected Date (UTC):", selectedDate);
        //console.log("Next Day (UTC):", nextDay);

        // Find present students and populate their names
        const presentStudents = await Attendance.find({
            classId,
            createdAt: { $gte: selectedDate, $lt: nextDay },
            remarks: "present"
            
        }).populate({
            path:"studentId",
            model : "Student",
            select : "-createdAt -updatedAt -__v "
        }) 


        const presentCount = presentStudents.length;

       // console.log("Present Count:", presentCount);
        //console.log("Present Students:", presentStudents);

        res.status(200).json({
            message: `Total present students on ${date}`,
            count: presentCount,
            students: presentStudents.map(student => ({
                id: student.studentId._id,
                name: student.studentId.name
            }))
        });

    } catch (error) {
        console.error("Error fetching attendance count:", error);
        res.status(500).json({ 
            message: "Error fetching attendance count", 
            error: error.message 
        });
    }
};


exports.getAllAttendance = async (req, res) => {
    try {
        const { classId } = req.params;

        if (!classId) {
            return res.status(400).json({
                message: "Please provide classId",
            });
        }

        // Fetch attendance records for the given class
        const attendanceRecords = await Attendance.find({ classId })
        .populate({
                 path:"classId",
                 model : "Class",
                 select : "-createdAt -updatedAt -__v"
             }) 
             

        const final = attendanceRecords[0].classId.name
        //console.log("okokok",final)


       // console.log("Attendance Records:", attendanceRecords);

        if (!attendanceRecords.length) {
            return res.status(404).json({
                message: "No attendance found",
            });
        }

        // Extract unique dates using createdAt
        const uniqueDates = new Set();
        attendanceRecords.forEach(record => {
            if (record.createdAt) {
                uniqueDates.add(moment(record.createdAt).format('YYYY-MM-DD'));
            }
        });

        //console.log("Unique Dates:", uniqueDates);

        res.status(200).json({
            message: "Attendance dates fetched successfully",
            totalDays: uniqueDates.size,
            dates: [...uniqueDates],
            data: final
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
};
