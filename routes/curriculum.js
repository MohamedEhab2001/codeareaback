const router = require("express").Router();
const {
  getChapter,
  getChapters,
  getLessonsByChapterId,
} = require("../controllers/curriculumController");

router.route("/chapters").get(getChapters);
router.route("/lessons/:id").get(getLessonsByChapterId);
router.route("/:course_id").get(getChapter);

module.exports = router;
