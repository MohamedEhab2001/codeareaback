const stripe = require("../helpers/stripe");
const jwt = require("jsonwebtoken");
const { isHere } = require("../helpers/Validation");
const createPaymentSession = async (req, res) => {
  const domainURL = process.env.WEB_APP_URL;
  const { line_items, customer_email, form } = req.body;
  isHere(line_items);
  isHere(customer_email);
  isHere(form);
  form["amount"] = line_items[0].quantity * line_items[0].price_data.unit_amount
  const token = generatePaymentData(form);
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    mode: "payment",
    line_items,
    customer_email,
    success_url: `${domainURL}success?session_id={CHECKOUT_SESSION_ID}?token=${token}`,
    cancel_url: `${domainURL}cancel`,
  });
  res.status(201).json(session);
};

const generatePaymentData = (data) => {
  const token = jwt.sign(
    {
      ...data,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "10d",
    }
  );
  return token;
};

module.exports = {
  createPaymentSession,
};
