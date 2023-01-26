const router = require("express").Router();
const {
  addDemo,
  afterDemoRegistration,
  createDemoClass,
} = require("../controllers/demoController");
const { create } = require("../controllers/zoomController");
router.route("/").post(addDemo, afterDemoRegistration, create, createDemoClass);

module.exports = router;
