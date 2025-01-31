const { addSchool, getMySchool } = require("../controller/schoolController")
const isAuthenticated = require("../moddleware/isAuthenticated")

const router = require("express").Router()


router.route("/add")
    .post(isAuthenticated, addSchool)
router.route("/")
    .get(isAuthenticated,getMySchool)


module.exports = router