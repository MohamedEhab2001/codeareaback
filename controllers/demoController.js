const { models } = require("../database/connect");
const {
  Teacher_id,
  Delete_Availabilty,
  getDemoByNumber,
} = require("../database/queries");
const sequalize = require("../database/connect");
const { QueryTypes } = require("sequelize");
const { makeid } = require("../helpers/Methods");
const { notFound } = require("../errors");
const jwt = require("jsonwebtoken");
const Vconnect = require("../helpers/vconnect");

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
  req.teacher = teacher[0]?.teacher_id;
  await sequalize.query(
    Delete_Availabilty(req.demo.slot_id, teacher[0].teacher_id)
  );
  req.operations = { ...req.operations, afterDemo: "done" };
  const vconnect = new Vconnect();
  const meetings = await vconnect.ListMeetings();
  console.log(meetings);
  req.meeting_id = meetings[req.body.ref_id - 1].meeting_id;
  next();
};

const createDemoClass = async (req, res, next) => {
  const { join_url } = req.meeting;
  const teacher = req.teacher;
  const demo_number = makeid(15);
  await models.demoClass.create({
    demo_app_id: req.demo.id,
    teacher_id: teacher,
    teacher_duration: 0,
    student_duration: 0,
    meeting_url: join_url,
    number: demo_number,
  });
  req.demo_number = demo_number;
  req.operations = { ...req.operations, classCreated: "done" };
  next();
};

const getDemoBynumber = async (req, res) => {
  const { num } = req.params;
  const demo = await sequalize.query(getDemoByNumber(num), {
    type: QueryTypes.SELECT,
  });
  if (!demo[0]) {
    throw new notFound(
      "No demo with this number",
      "please make sure that you wrote the correct demo number"
    );
  }
  res.status(200).json({ demo: demo[0] });
};

const createRefralLink = async (req, res) => {
  const { person_id } = req.params;
  const person = await models.referal_person.findByPk(person_id);
  if (!person) {
    throw new notFound(
      "No One found",
      "please make sure that you wrote the correct ID"
    );
  }

  const token = jwt.sign(
    {
      person: {
        ...person.dataValues,
      },
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "10d",
    }
  );

  res.status(200).json({ token });
};

module.exports = {
  addDemo,
  afterDemoRegistration,
  createDemoClass,
  getDemoBynumber,
  createRefralLink,
};
