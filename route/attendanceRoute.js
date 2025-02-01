const { doAttendance, getAttendance } = require("../controller/attendanceController")
const isAuthenticated = require("../moddleware/isAuthenticated")


const router = require("express").Router()


router.route("/do")
    .post(isAuthenticated,doAttendance)
    .get(isAuthenticated,getAttendance)

module.exports = router