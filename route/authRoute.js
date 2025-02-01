const { registerUser, getAllUser, loginUser } = require("../controller/authController")
const isAuthenticated = require("../moddleware/isAuthenticated")


const router = require("express").Router()


router.route("/register")
    .post(registerUser)

router.route("/all")
    .get(isAuthenticated ,getAllUser)

router.route("/login")
    .post(loginUser)

module.exports = router