const sequalize = require("../database/connect");
const { models } = sequalize;
const {
  returnStudentIdFromEmailPhone,
  UpdateLastPayment,
  getStudentTeacherSchedule,
  getStudentPaidChapter,
  getLastPaidClassId,
  getLastSubmittedPaidClassId,
  getTeacherName,
  getUpComingClassesLimitedTo,
  getSelectedTeacherSchedule,
  getRateDataSet,
  getPaidClassCountData,
  checkIfThereIsPaid,
  SearchInClasses,
  getStudentOperations,
  checkIfThereIsPaidTeacher,
  getMeetingIdByStudentId,
} = require("../database/queries");
const { QueryTypes } = require("sequelize");
const { makeid } = require("../helpers/Methods");
const jwt = require("jsonwebtoken");
const { badRequest } = require("../errors");
const Vconncet = require("../helpers/vconnect");
const createStudent = async (req, res, next) => {
  const password = makeid(10);
  await models.student.create({
    name: req.demo.st_name,
    email: req.demo.parent_email,
    parent_name: req.demo.parent_name,
    parent_email: req.demo.parent_email,
    parent_phone: req.demo.parent_phone,
    gender: req.demo.st_gender,
    birthday: "0",
    teacher_id: req.teacher.teacher_id,
    paid: false,
    purchase_number: req.demo_number,
    password: password,
  });

  req.operations = { ...req.operations, creatingStudent: "done" };
  req.password = password;
  next();
};

const updateStudent = async (req, res) => {
  const { id } = req.params;
  await models.student.update(req.body, {
    where: {
      id,
    },
  });
  res.status(200).json({ msg: "Updates succefully" });
};

const GetStudentIdFromParentEmail = async (req, res, next) => {
  const { parent_email, parent_phone, payedChapters, plan, type, amount } =
    req.body;
  const [student] = await sequalize.query(
    returnStudentIdFromEmailPhone(parent_email, parent_phone),
    {
      type: QueryTypes.SELECT,
    }
  );
  console.log(student);
  req.student_id = student.id;
  req.payment = { payedChapters, plan, type, amount };
  next();
};

const SavePaymentData = async (req, res, next) => {
  const now = new Date();
  const numberOfMonths = req.payment.payedChapters.length * 2;
  const end_date = new Date(now.setMonth(now.getMonth() + numberOfMonths));
  const payment = await models.operation.create({
    type: req.payment.type || "cash",
    status: "current",
    comment: "",
    amount: req.payment.amount / 100,
    student_id: req.student_id,
    plan: req.payment.plan,
    end_date,
  });
  req.payment_id = payment.id;
  next();
};

const addOperationChapter = async (req, _, next) => {
  const { payedChapters } = req.payment;
  const payedChapterModified = payedChapters.map((chapter) => {
    return {
      operationId: req.payment_id,
      chapterId: parseInt(chapter),
    };
  });
  await models.operation_chapter.bulkCreate(payedChapterModified);
  next();
};

const CloseLastPayment = async (req, res, next) => {
  await sequalize.query(UpdateLastPayment(req.student_id, req.payment_id));
  req.status = true;
  next();
};

const updateStudentPaidStatus = async (req, res) => {
  await models.student.update(
    {
      paid: req.status,
    },
    {
      where: {
        id: req.student_id,
      },
    }
  );
  res.status(201).json({ msg: "Done" });
};

const loginUser = async (req, res) => {
  req.student["password"] = "";
  if (req.student.teacher_id) {
    const teacher = await sequalize.query(getTeacherName(req.student.id), {
      type: QueryTypes.SELECT,
    });
    req.student["teacher_name"] = teacher[0].name;
  }
  const token = jwt.sign(
    {
      student: {
        ...req.student.dataValues,
        teacher_name: req.student.teacher_name,
      },
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "1h",
    }
  );

  res.status(200).json({ token });
};

const StudentById = async (req, res) => {
  const student = await models.student.findByPk(req.params.id);
  res.status(200).json(student);
};

const CheckStudentSchedule = async (req, res, next) => {
  const schedule = await models.student_schedule.findAll({
    attributes: [],
    raw: true,
    include: [
      {
        model: models.teacher_schedule,
        attributes: ["day", "time", "id"],
      },
    ],
    where: {
      student_id: req.params.id || req.body.student_id,
    },
  });

  const modifiedSchedule = schedule.map((s) => ({
    day: s["teacher_schedule.day"],
    time: s["teacher_schedule.time"],
    id: s["teacher_schedule.id"],
  }));

  if (req.addingJourney || req.deleteingJourney) {
    req.schedule = modifiedSchedule;
    next(); // checkStudentScheduleLength
    return;
  }

  res.status(200).json(modifiedSchedule);
};

const getStudentTeacherSlots = async (req, res) => {
  const { purchase_number } = req.query;
  const schedule = await sequalize.query(
    getStudentTeacherSchedule(purchase_number),
    {
      type: QueryTypes.SELECT,
    }
  );
  res.status(200).json(schedule);
};

const prepareAddingStudentSchedule = (req, _, next) => {
  const { add } = req.body;
  req.addingJourney = add ? true : false;
  req.deleteingJourney = !add ? true : false;
  next(); // CheckStudentSchedule
};

const checkStudentScheduleLength = (req, _, next) => {
  if (!req?.schedule.length || req.addingJourney) {
    next(); // addStudentSchedule
  } else {
    next("route"); // removeStudentSchedule
  }
};

const removeStudentSchedule = async (req, _, next) => {
  const { student_id, teacher_schedule_id } = req.body;
  await models.student_schedule.destroy({
    where: {
      studentId: student_id,
      teacherScheduleId: teacher_schedule_id,
    },
  });
  next(); // prepareDataNeededForClassCreation
};

const addStudentSchedule = async (req, _, next) => {
  const { selectedSchedule, student_id } = req.body;
  const student = await models.student.findOne({
    attributes: ["name"],
    where: { id: student_id },
  });
  req.body.st_name = student.name;
  const StudentSchedule = selectedSchedule.map((id) => {
    return { studentId: student_id, teacherScheduleId: id };
  });
  await models.student_schedule.bulkCreate(StudentSchedule);
  next(); // prepareDataNeededForClassCreation
};

const prepareDataNeededForClassCreation = async (req, _, next) => {
  const CurrentChapters = await sequalize.query(
    getStudentPaidChapter(req.body.student_id),
    {
      type: QueryTypes.SELECT,
    }
  );
  const getLastSubmittedPaidClass = await sequalize.query(
    getLastSubmittedPaidClassId(req.body.student_id),
    {
      type: QueryTypes.SELECT,
    }
  );

  const getLastPaidClass = await sequalize.query(
    getLastPaidClassId(req.body.student_id),
    {
      type: QueryTypes.SELECT,
    }
  );

  const meeting = await sequalize.query(
    getMeetingIdByStudentId(req.body.student_id),
    {
      type: QueryTypes.SELECT,
    }
  );

  if (!getLastSubmittedPaidClass.length) {
    if (!getLastPaidClass.length) {
      req.numberOfClasses = CurrentChapters.length * 24;
    }
  }
  req.currentChapters = CurrentChapters;
  req.lastSubmitted = getLastSubmittedPaidClass;
  req.lastPaid = getLastPaidClass;
  req.meeting_id = meeting[0].meeting_id;

  next(); // modifyNumberOfClasess
};

const modifyNumberOfClasess = async (req, res, next) => {
  if (req.numberOfClasses) {
    next();
    return;
  }
  if (req.lastSubmitted.length) {
    req.numberOfClasses = lastPaid.length;
  }
  if (req.lastPaid.length && !req.lastSubmitted.length) {
    req.numberOfClasses = req.currentChapters.length * 24;
  }
  await models.paid_class.destroy({
    where: {
      lesson_id: null,
      student_id: req.body.student_id,
    },
  });
  next(); // getTeacherSchedule
};

const getTeacherSchedule = async (req, _, next) => {
  const studentSchedule = await models.student_schedule.findAll({
    where: {
      student_id: req.body.student_id,
    },
  });
  const selectedSchedule = studentSchedule.map((sc) => sc.teacher_schedule_id);
  const SelectedTeacherSchedule = await sequalize.query(
    getSelectedTeacherSchedule(
      selectedSchedule.length ? selectedSchedule : req.body.selectedSchedule
    ),
    {
      type: QueryTypes.SELECT,
    }
  );
  req.SelectedTeacherSchedule = SelectedTeacherSchedule;
  next(); // CreateClasses;
};

const CreateClasses = async (req, _, next) => {
  const student_id = req.body.student_id;
  const teacher_id = req.SelectedTeacherSchedule[0].teacher_id;
  const toLoop = 1300;
  const numberIsEqualTo = req.numberOfClasses;
  const Schedule = [...req.SelectedTeacherSchedule];

  let ClassesTiming = [];
  for (let i = 0; i < toLoop; i++) {
    let inDate = new Date();
    inDate.setDate(inDate.getDate() + i + 1);

    if (ClassesTiming.length == numberIsEqualTo) {
      break;
    }
    let dayOfWeekNumber = inDate.getDay();
    const target = Schedule.find(
      (schedule) => schedule.day === dayOfWeekNumber
    );
    if (target) {
      inDate.setUTCHours(target.time.split(":")[0]);
      inDate.setUTCMinutes(target.time.split(":")[1]);
      ClassesTiming.push({
        student_id,
        teacher_id,
        appointment: inDate,
      });
    }
  }
  const classes = await models.paid_class.bulkCreate(ClassesTiming);
  req.classes = classes;
  req.paid = true;
  req.teacher_id = teacher_id;

  next(); // Zoom
};

const createNextMeetingUrl = async (req, _, next) => {
  next(); // changeTeacherSlotAvailability // Teacher
};

const AssignTeacherToStudent = async (req, _, next) => {
  await models.student.update(
    { teacher_id: req.teacher_id },
    {
      where: {
        id: req.body.student_id,
      },
    }
  );
  next(); // changeTeacherSlotAvailability // Teacher
};

const getClassesData = async (req, res, next) => {
  const { timeZone, id, limit } = req.query;
  const upcoming = await sequalize.query(
    getUpComingClassesLimitedTo(parseInt(limit), parseInt(id), timeZone),
    {
      type: QueryTypes.SELECT,
    }
  );
  if (!upcoming.length) {
    res.status(200).json({ msg: "No classes yet" });
    return;
  }
  req.classes = upcoming;
  next();
};

const CreateNextClassIfNeeded = async (req, res, next) => {
  if (req.classes[0]?.canceled || req.classes[0]?.meeting_url) {
    res.status(200).json(req.classes);
    return;
  }
  const student = await models.student.findByPk(parseInt(req.query.id));
  const meeting = await sequalize.query(getMeetingIdByStudentId(req.query.id), {
    type: QueryTypes.SELECT,
  });
  req.body.st_name = student.name;
  req.paid = true;
  req.meeting_id = meeting[0].meeting_id;
  if (!req.classes.length) {
    res.status(200).json(req.classes);
    return;
  }
  next();
};

const sendClasses = (req, res) => {
  res.status(200).json(req.classes);
};

const refreshToken = async (req, res, next) => {
  const { id } = req.params;
  const student = await models.student.findByPk(parseInt(id));
  req.student = student;
  next();
};

const getReteData = async (req, res) => {
  const { id } = req.params;
  const rates = await sequalize.query(getRateDataSet(id), {
    type: QueryTypes.SELECT,
  });
  res.status(200).json(rates);
};

const getClassesFRData = async (req, res) => {
  // F - for finished
  // R for remaining
  const { id } = req.params;
  const classes = await sequalize.query(getPaidClassCountData(id), {
    type: QueryTypes.SELECT,
  });
  res.status(200).json({ ...classes[0] });
};

const cancelPaidClass = async (req, res) => {
  const { id } = req.params;
  await models.paid_class.update(
    { canceled: true },
    {
      where: {
        id: id,
      },
    }
  );
  res.status(200).json({ msg: "Class canceled" });
};

const ReSchedulePaidClass = async (req, res) => {
  const { id } = req.params;
  const { time, paid_id, teacher_id } = req.body;
  const timeWithOffset = time + "UTC";
  const date = new Date(timeWithOffset);
  const day = date.getDate();
  const year = date.getFullYear();
  const hour = date.getHours();
  const month = date.getMonth() + 1;
  date.setMinutes("0");

  const student = await models.student.findByPk(id);
  const isTherePaidTeacher = await sequalize.query(
    checkIfThereIsPaidTeacher(day, month, year, student.teacher_id, hour),
    {
      type: QueryTypes.SELECT,
    }
  );

  if (isTherePaidTeacher.length) {
    throw new badRequest("Teacher have a class in this appointment");
  }

  const isTherePaid = await sequalize.query(
    checkIfThereIsPaid(day, month, year, id),
    {
      type: QueryTypes.SELECT,
    }
  );
  if (isTherePaid.length && !isTherePaid[0].canceled) {
    throw new badRequest("You have a class in this appointment");
  }

  await models.paid_class.update(
    {
      appointment: date,
    },
    {
      where: {
        id: paid_id,
      },
    }
  );

  res.status(200).json({ msg: "Class re-scheduled" });
};

const searchPaidClasses = async (req, res) => {
  const { data } = req.query;
  const conditions = JSON.parse(data);
  const classes = await sequalize.query(SearchInClasses(conditions), {
    type: QueryTypes.SELECT,
  });
  res.status(200).json(classes);
};

const studentOperations = async (req, res) => {
  const { id } = req.params;
  const operations = await sequalize.query(getStudentOperations(id), {
    type: QueryTypes.SELECT,
  });
  res.status(200).json(operations);
};

const submitFeedback = async (req, res) => {
  const {
    paid_id,
    lesson_id,
    st_focus_rate,
    assignment_rate,
    comment,
    custom_assignment,
    assignment,
  } = req.body;
  await models.paid_class.update(
    {
      lesson_id,
      st_focus_rate,
      assignment_rate,
      comment,
      custom_assignment,
      assignment,
    },
    {
      where: {
        id: paid_id,
      },
    }
  );
  res.status(200).json({ msg: "Feedback submitted" });
};

const JoinMeeting = async (req, res) => {
  const { class_id, moderator, student_id, name } = req.body;
  const meeting_id = await sequalize.query(
    getMeetingIdByStudentId(student_id),
    {
      type: QueryTypes.SELECT,
    }
  );
  const paid_class = await models.paid_class.findByPk(class_id);

  const vconnect = new Vconncet();

  const url = await vconnect.JoinMeeting(
    meeting_id[0].meeting_id,
    name,
    moderator,
    paid_class.dataValues.session_id
  );

  res.status(200).json({ url });
};

module.exports = {
  createStudent,
  GetStudentIdFromParentEmail,
  SavePaymentData,
  CloseLastPayment,
  updateStudentPaidStatus,
  loginUser,
  StudentById,
  CheckStudentSchedule,
  addOperationChapter,
  getStudentTeacherSlots,
  prepareAddingStudentSchedule,
  checkStudentScheduleLength,
  addStudentSchedule,
  prepareDataNeededForClassCreation,
  modifyNumberOfClasess,
  getTeacherSchedule,
  CreateClasses,
  createNextMeetingUrl,
  AssignTeacherToStudent,
  getClassesData,
  CreateNextClassIfNeeded,
  sendClasses,
  refreshToken,
  getReteData,
  getClassesFRData,
  cancelPaidClass,
  ReSchedulePaidClass,
  removeStudentSchedule,
  searchPaidClasses,
  studentOperations,
  updateStudent,
  submitFeedback,
  JoinMeeting,
};
