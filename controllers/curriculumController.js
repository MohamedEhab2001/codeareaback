const { models } = require("../database/connect");

const getChapter = async (req, res) => {
  const { course_id } = req.params;
  const chapters = await models.chapter.findAll({
    where: {
      course_id: parseInt(course_id),
    },
  });
  res.status(200).json({ chapters });
};

const getChapters = async (req, res) => {
  const chapters = await models.chapter.findAll({
    attributes: ["id", "title"],
  });
  res.status(200).json({ chapters });
};

const getLessonsByChapterId = async (req, res) => {
  const lessons = await models.lesson.findAll({
    attributes: [
      "id",
      "title",
      "cover_url",
      "quiz_url",
      "material_url",
      "assignment_url",
    ],
    where: {
      chapter_id: req.params.id,
    },
  });
  res.status(200).json({ lessons });
};

module.exports = {
  getChapter,
  getChapters,
  getLessonsByChapterId,
};
