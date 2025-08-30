const {
  addClass,
  getMyClass,
  editClass,
  getSingleClass,
  deleteClass,
} = require("../controller/classController");
const isAuthenticated = require("../middleware/isAuthenticated");
const catchAsync = require("../services/catchAsync");

const router = require("express").Router();

router
  .route("/add/:schoolId")
  .post(isAuthenticated, catchAsync(addClass))
  .get(isAuthenticated, catchAsync(getMyClass));

router
  .route("/:schoolId/:classId")
  .patch(isAuthenticated, catchAsync(editClass))
  .get(isAuthenticated, catchAsync(getSingleClass))
  .delete(isAuthenticated, catchAsync(deleteClass));

module.exports = router;
