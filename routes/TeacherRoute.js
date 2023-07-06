const express = require("express");
const router = express.Router();

const {
  createTeacher,
  getTeacherById,
  updateTeacher,
  deleteTeacher,
  createTeacherSchedule,
} = require("../controllers/TeacherController");

router.route("/").post(createTeacher);

router
  .route("/:id")
  .get(getTeacherById)
  .put(updateTeacher)
  .delete(deleteTeacher);

router.route("/schedule").post(createTeacherSchedule);

module.exports = router;
