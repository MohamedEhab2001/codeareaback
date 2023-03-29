const router = require("express").Router();
const {
  GetStudentIdFromParentEmail,
  SavePaymentData,
  CloseLastPayment
} = require("../controllers/StudentController");

router.route("/payment").post(GetStudentIdFromParentEmail, SavePaymentData, CloseLastPayment);

module.exports = router;
