const { notFound, unAuthanticated } = require("../errors");
const { models } = require("../database/connect");
const { isHere } = require("../helpers/Validation");
// const bcrypt = require("bcryptjs");

const CheckEmail = async (req, res, next) => {
  const { email } = req.body;
  isHere(email);
  const student = await models.student.findOne({
    where: {
      email,
    },
  });

  if (!student) {
    throw new notFound("6", "");
  } else {
    req.student = student;
    next();
  }
};

const CheckPassword = async (req, res, next) => {
  const { password } = req.body;
  isHere(password);

  if (password != req.student.password) {
    throw new unAuthanticated("6", "");
  } else {
    next();
  }
};

module.exports = {
  CheckEmail,
  CheckPassword,
};
