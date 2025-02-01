const { doAttendance, getAttendance, getPresentCount } = require("../controller/attendanceController")
const isAuthenticated = require("../moddleware/isAuthenticated")
const catchAsync = require("../services/catchAsync")


const router = require("express").Router()


router.route("/do")
    .post(isAuthenticated,catchAsync(doAttendance))
    .get(isAuthenticated,catchAsync(getAttendance))
router.route("/present-count/:date")
    .get(isAuthenticated,catchAsync(getPresentCount))

module.exports = router