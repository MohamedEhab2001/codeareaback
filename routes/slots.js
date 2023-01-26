const router = require("express").Router();
const { sendAvailabilty } = require("../controllers/slotsController");
router.route("/").get(sendAvailabilty);

module.exports = router;
