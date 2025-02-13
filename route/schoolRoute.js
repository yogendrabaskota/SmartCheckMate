const { addSchool, getMySchool, editSchool } = require("../controller/schoolController")
const isAuthenticated = require("../moddleware/isAuthenticated")
const catchAsync = require("../services/catchAsync")

const router = require("express").Router()


router.route("/add")
    .post(isAuthenticated, catchAsync(addSchool))
router.route("/")
    .get(isAuthenticated,catchAsync(getMySchool))
router.route("/edit/:schoolId")
    .patch(isAuthenticated,catchAsync(editSchool))


module.exports = router