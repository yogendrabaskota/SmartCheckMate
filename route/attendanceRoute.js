const { doAttendance, getAttendance, getPresentCount, getAllAttendance } = require("../controller/attendanceController")
const isAuthenticated = require("../moddleware/isAuthenticated")
const catchAsync = require("../services/catchAsync")


const router = require("express").Router()



router.route("/do/:classId")
    .post(isAuthenticated,catchAsync(doAttendance))

router.route("/do/:classId/:studentId")
    .get(isAuthenticated,catchAsync(getAttendance))

router.route("/do")
    .post(isAuthenticated,catchAsync(doAttendance))

router.route("/present-count/:classId/:date")
    .get(isAuthenticated,catchAsync(getPresentCount))

router.route("/getAll/:classId")
    .get(isAuthenticated,catchAsync(getAllAttendance))

module.exports = router