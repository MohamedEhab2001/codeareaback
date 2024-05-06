const router = require("express").Router();
const {
  sendAvailabilty,
  getFutureSlots,
  createSlotAvailabilty,
} = require("../controllers/slotsController");
router.route("/").get(sendAvailabilty)
router.route("/future").get(getFutureSlots);
router.route("/availability").post(createSlotAvailabilty);
module.exports = router;
