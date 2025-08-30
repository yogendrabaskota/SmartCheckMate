const {
  addStudent,
  getClassStudent,
  getAllStudent,
} = require("../controller/studentController");
const isAuthenticated = require("../middleware/isAuthenticated");
const catchAsync = require("../services/catchAsync");

const router = require("express").Router();

router
  .route("/add/:schoolId/:classId")
  .post(isAuthenticated, catchAsync(addStudent))
  .get(isAuthenticated, catchAsync(getClassStudent));

router.route("/add/all").get(isAuthenticated, catchAsync(getAllStudent));

module.exports = router;
