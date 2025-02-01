const { doAttendance, getAttendance, getPresentCount } = require("../controller/attendanceController")
const isAuthenticated = require("../moddleware/isAuthenticated")


const router = require("express").Router()


router.route("/do")
    .post(isAuthenticated,doAttendance)
    .get(isAuthenticated,getAttendance)
router.route("/present-count/:date")
    .get(isAuthenticated,getPresentCount)

module.exports = router