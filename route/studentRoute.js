
const { addStudent, getClassStudent } = require("../controller/studentController")
const isAuthenticated = require("../moddleware/isAuthenticated")

const router = require("express").Router()


router.route("/add")
    .post(isAuthenticated, addStudent)
    .get(isAuthenticated,getClassStudent)

module.exports = router