const router = require("express").Router();
const { createPaymentSession } = require("../controllers/stripeController");

router.route("/").post(createPaymentSession);

module.exports = router;
