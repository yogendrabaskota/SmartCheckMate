const {
  registerUser,
  getAllUser,
  loginUser,
  sendData,
  forgetPassword,
  verifyotp,
  resetPassword,
} = require("../controller/authController");
const isAuthenticated = require("../middleware/isAuthenticated");
const validate = require("../middleware/validate");
const catchAsync = require("../services/catchAsync");
const {
  registerSchema,
  loginSchema,
  sendMessageSchema,
  forgetPasswordSchema,
  verifyOtpSchema,
  resetPasswordSchema,
} = require("../validators/userValidators");

const router = require("express").Router();

router
  .route("/register")
  .post(validate(registerSchema), catchAsync(registerUser));

router.route("/all").get(isAuthenticated, catchAsync(getAllUser));

router.route("/login").post(validate(loginSchema), catchAsync(loginUser));
router.route("/data").post(validate(sendMessageSchema), catchAsync(sendData));

router
  .route("/forget")
  .post(validate(forgetPasswordSchema), catchAsync(forgetPassword));
router
  .route("/verifyOtp")
  .post(validate(verifyOtpSchema), catchAsync(verifyotp));

router
  .route("/resetPassword")
  .post(validate(resetPasswordSchema), catchAsync(resetPassword));

module.exports = router;
