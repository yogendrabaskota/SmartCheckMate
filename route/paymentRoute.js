const { initiateKhaltiPayment, verifyPidx } = require("../controller/paymentController")
const isAuthenticated = require("../moddleware/isAuthenticated")
const catchAsync = require("../services/catchAsync")

const router = require("express").Router()

router.route("/")
    .post(isAuthenticated,catchAsync(initiateKhaltiPayment))
router.route("/success")
    .get(catchAsync(verifyPidx))

module.exports = router