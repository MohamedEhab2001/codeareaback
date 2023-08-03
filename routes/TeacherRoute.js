const express = require("express");
const router = express.Router();

const {
  createTeacher,
  getTeacherById,
  updateTeacher,
  deleteTeacher,
  createTeacherSchedule,
  loginTeacher,
} = require("../controllers/TeacherController");
const {
  CheckTeacherEmail,
  CheckTeacherPassword,
} = require("../middlewares/Login");

router.route("/").post(createTeacher);
router
  .route("/login")
  .post(CheckTeacherEmail, CheckTeacherPassword, loginTeacher);
router
  .route("/:id")
  .get(getTeacherById)
  .put(updateTeacher)
  .delete(deleteTeacher);

router.route("/schedule").post(createTeacherSchedule);

module.exports = router;
