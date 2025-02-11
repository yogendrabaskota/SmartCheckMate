const { registerUser, getAllUser, loginUser, sendData } = require("../controller/authController")
const isAuthenticated = require("../moddleware/isAuthenticated")
const catchAsync = require("../services/catchAsync")


const router = require("express").Router()


router.route("/register")
    .post(registerUser)

router.route("/all")
    .get(isAuthenticated ,catchAsync(getAllUser))

router.route("/login")
    .post(loginUser)
router.route("/data")
    .post(catchAsync(sendData))

module.exports = router