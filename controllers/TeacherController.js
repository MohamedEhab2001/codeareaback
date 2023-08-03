const { models } = require("../database/connect");
const { ModelKeysValidate } = require("../helpers/Validation");
const jwt = require("jsonwebtoken");

const getTeacherById = async (req, res) => {
  const { id } = req.params;
  const teacher = await models.teacher.findOne({
    where: {
      id,
    },
  });
  res.status(200).json({ teacher });
};

const loginTeacher = (req, res) => {
  req.teacher["password"] = "";
  const token = jwt.sign(
    {
      student: {
        ...req.teacher.dataValues,
      },
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "1h",
    }
  );
  res.status(200).json({ token });
};

const createTeacher = async (req, res) => {
  ModelKeysValidate(models.teacher.rawAttributes, req.body);
  const teacher = await models.teacher.create(req.body);
  res.status(201).json({ teacher });
};

const createTeacherSchedule = async (req, res) => {
  ModelKeysValidate(models.teacher_schedule.rawAttributes, req.body);
  const teacher_schedule = await models.teacher_schedule.create(req.body);
  res.status(201).json({ teacher_schedule });
};

const updateTeacher = async (req, res) => {
  const { id } = req.params;
  const teacher = await models.teacher.findOne({
    where: {
      id,
    },
  });
  if (!teacher) {
    return res.status(404).json({ message: "Teacher not found" });
  }
  await teacher.update(req.body);
  res.status(200).json({ message: "Teacher updated successfully" });
};

const deleteTeacher = async (req, res) => {
  const { id } = req.params;
  const teacher = await models.teacher.findOne({
    where: {
      id,
    },
  });
  if (!teacher) {
    return res.status(404).json({ message: "Teacher not found" });
  }
  await teacher.destroy();
  res.status(200).json({ message: "Teacher deleted successfully" });
};

const changeTeacherSlotAvailability = async (req, res) => {
  const { SelectedTeacherSchedule } = req;

  if (req.deleteingJourney) {
    await models.teacher_schedule.update(
      { available: true },
      {
        where: {
          id: req.body.teacher_schedule_id,
        },
      }
    );
    res.status(200).json({ msg: "Deleting Schedule Done" });
    return;
  }

  SelectedTeacherSchedule.map(async (sc) => {
    await models.teacher_schedule.update(
      { available: false },
      {
        where: {
          id: sc.id,
        },
      }
    );
  });

  res.status(200).json({ msg: "Adding Schedule Done" });
};

module.exports = {
  getTeacherById,
  createTeacher,
  updateTeacher,
  deleteTeacher,
  createTeacherSchedule,
  changeTeacherSlotAvailability,
  loginTeacher,
};
