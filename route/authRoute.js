const { registerUser, getAllUser, loginUser } = require("../controller/authController")


const router = require("express").Router()


router.route("/register")
    .post(registerUser)

router.route("/all")
    .get(getAllUser)

router.route("/login")
    .post(loginUser)

module.exports = router