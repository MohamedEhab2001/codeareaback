const express = require("express");
const router = express.Router();

const {
  createTeacher,
  getTeacherById,
  updateTeacher,
  deleteTeacher,
  createTeacherSchedule,
  loginTeacher,
  getTeachers,
  getTeacherClasses,
  getTeacherSchedule,
  deleteTeacherSchedule,
  TeacherStudent,
  TeacherSetting,
} = require("../controllers/TeacherController");
const {
  CheckTeacherEmail,
  CheckTeacherPassword,
} = require("../middlewares/Login");

router.route("/").post(createTeacher).get(getTeachers);
router
  .route("/login")
  .post(CheckTeacherEmail, CheckTeacherPassword, loginTeacher);

router.route("/classes/:id").get(getTeacherClasses);
router.route("/students").get(TeacherStudent);
router.route("/settings").get(TeacherSetting);

router
  .route("/schedule")
  .post(createTeacherSchedule)
  .get(getTeacherSchedule)
  .delete(deleteTeacherSchedule);
router
  .route("/:id")
  .get(getTeacherById)
  .put(updateTeacher)
  .delete(deleteTeacher);

module.exports = router;
