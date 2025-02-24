const { registerUser, getAllUser, loginUser, sendData, forgetPassword, verifyotp, resetPassword } = require("../controller/authController")
const isAuthenticated = require("../moddleware/isAuthenticated")
const catchAsync = require("../services/catchAsync")


const router = require("express").Router()


router.route("/register")
    .post(catchAsync(registerUser))

router.route("/all")
    .get(isAuthenticated ,catchAsync(getAllUser))

router.route("/login")
    .post(loginUser)
router.route("/data")
    .post(catchAsync(sendData))

router.route("/forget")
    .post(catchAsync(forgetPassword))
router.route("/verifyOtp")
    .post(catchAsync(verifyotp))

router.route("/resetPassword")
    .post(catchAsync(resetPassword))

module.exports = router