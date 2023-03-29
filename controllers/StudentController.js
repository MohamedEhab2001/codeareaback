const sequalize = require("../database/connect");
const { models } = sequalize;
const {
  returnStudentIdFromEmailPhone,
  UpdateLastPayment,
} = require("../database/queries");
const { QueryTypes } = require("sequelize");
const { makeid } = require("../helpers/Methods");

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
  req.password = password
  next();
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

const CloseLastPayment = async (req, res) => {
  await sequalize.query(UpdateLastPayment(req.student_id, req.payment_id));
  res.status(201).json({ msg: "Done" });
};

module.exports = {
  createStudent,
  GetStudentIdFromParentEmail,
  SavePaymentData,
  CloseLastPayment,
};
