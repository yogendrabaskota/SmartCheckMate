
const { addClass, getMyClass, editClass, getSingleClass } = require("../controller/classController")
const isAuthenticated = require("../moddleware/isAuthenticated")
const catchAsync = require("../services/catchAsync")

const router = require("express").Router()


router.route("/add/:schoolId")
    .post(isAuthenticated,catchAsync(addClass))
    .get(isAuthenticated,catchAsync(getMyClass))

router.route("/edit/:schoolId/:classId")
    .patch(isAuthenticated,catchAsync(editClass))
    .get(isAuthenticated,catchAsync(getSingleClass))


module.exports = router