const { models } = require("../database/connect");
const { Teacher_id, Delete_Availabilty } = require("../database/queries");
const sequalize = require("../database/connect");
const { QueryTypes } = require("sequelize");
const addDemo = async (req, res, next) => {
  const newDemo = await models.demoApp.create(req.body);
  req.demo = newDemo;
  req.operations = {
    demoCreation: "done",
  };
  next();
};
const afterDemoRegistration = async (req, res, next) => {
  const teacher = await sequalize.query(Teacher_id(req.demo.slot_id), {
    type: QueryTypes.SELECT,
  });
  // await sequalize.query(
  //   Delete_Availabilty(req.demo.slot_id, teacher[0].teacher_id)
  // );
  req.teacher = teacher[0].teacher_id;
  req.operations = { ...req.operations, afterDemo: "done" };
  next();
};

const createDemoClass = async (req, res) => {
  const { join_url } = req.meeting;
  const teacher = req.teacher;
  await models.demoClass.create({
    demo_app_id: req.demo.id,
    teacher_id: teacher,
    teacher_duration: 0,
    student_duration: 0,
    meeting_url: join_url,
  });
  req.operations = { ...req.operations, classCreated: "done" };
  res.status(201).json({
    op: req.operations,
  });
};

module.exports = {
  addDemo,
  afterDemoRegistration,
  createDemoClass,
};
