const router = require("express").Router();
const { getChapter } = require("../controllers/curriculumController");

router.route("/:course_id").get(getChapter);

module.exports = router;
