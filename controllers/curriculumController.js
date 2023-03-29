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

module.exports = {
  getChapter,
};
