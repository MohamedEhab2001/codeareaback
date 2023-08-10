const router = require("express").Router();
const {
  prepareDemoMessage,
  sendDemoMail,
  sendPaymenMail,
  sendTechMail,
} = require("../controllers/mailController");
router.route("/").post(prepareDemoMessage, sendDemoMail);
router.route("/payment").post(sendPaymenMail);
router.route("/tech").post(sendTechMail);

module.exports = router;
