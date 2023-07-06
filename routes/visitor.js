const router = require("express").Router();
const { addVisitor } = require("../controllers/visitorController");

router.route("/").post(addVisitor);

module.exports = router;
