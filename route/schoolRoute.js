const { addSchool, getMySchool } = require("../controller/schoolController")
const isAuthenticated = require("../moddleware/isAuthenticated")
const catchAsync = require("../services/catchAsync")

const router = require("express").Router()


router.route("/add")
    .post(isAuthenticated, catchAsync(addSchool))
router.route("/")
    .get(isAuthenticated,catchAsync(getMySchool))


module.exports = router