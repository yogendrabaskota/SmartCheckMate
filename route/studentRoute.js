
const { addStudent, getClassStudent } = require("../controller/studentController")
const isAuthenticated = require("../moddleware/isAuthenticated")
const catchAsync = require("../services/catchAsync")

const router = require("express").Router()

router.route("/add/:schoolId/:classId")
    .post(isAuthenticated, catchAsync(addStudent))
    .get(isAuthenticated,catchAsync(getClassStudent))



module.exports = router