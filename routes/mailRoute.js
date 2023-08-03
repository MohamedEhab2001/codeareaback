const router = require("express").Router();
const {
  prepareDemoMessage,
  sendDemoMail,
  sendPaymenMail
} = require("../controllers/mailController");
router.route("/").post(prepareDemoMessage, sendDemoMail);
router.route("/payment").post(sendPaymenMail);

module.exports = router;
