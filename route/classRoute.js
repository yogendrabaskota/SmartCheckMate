
const { addClass, getMyClass } = require("../controller/classController")
const isAuthenticated = require("../moddleware/isAuthenticated")

const router = require("express").Router()


router.route("/add/:schoolId")
    .post(isAuthenticated,addClass)
    .get(isAuthenticated,getMyClass)


module.exports = router