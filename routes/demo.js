const router = require("express").Router();
const {
  addDemo,
  afterDemoRegistration,
  createDemoClass,
  getDemoBynumber,
} = require("../controllers/demoController");
const { sendDemoMail } = require("../controllers/mailController");
const { create } = require("../controllers/zoomController");
const { createStudent } = require("../controllers/StudentController");
router
  .route("/")
  .post(
    addDemo,
    afterDemoRegistration,
    create,
    createDemoClass,
    createStudent,
    sendDemoMail
  );
router.route("/:num").get(getDemoBynumber);
module.exports = router;
