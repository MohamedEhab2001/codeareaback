const Zoho = require("../helpers/Mail");
const { default: axios } = require("axios");
const template = require("../static");
const moment = require("moment");

const sendDemoMail = async (req, res) => {
  const zoho = new Zoho();
  const token = await zoho.TestToken();
  const redered = template({
    parent_name: req.demo.parent_name,
    email: req.demo.parent_email,
    date: moment(req.start).tz(req.demo.timeZone).format("MMM Do YY"),
    time: moment(req.start).tz(req.demo.timeZone).format("h:mm a"),
    meeting: req.meeting.join_url,
    number: req.demo_number,
    kid: req.demo.st_name,
    password: req.password,
  });
  await axios.post(
    `https://mail.zoho.com/api/accounts/${process.env.ZOHO_ACCOUNT_ID}/messages`,
    {
      fromAddress: "demo@codearea.uk",
      toAddress: req.demo.parent_email,
      subject: "Demo Application",
      content: redered,
    },
    {
      headers: {
        Authorization: `Zoho-oauthtoken ${token}`,
      },
    }
  );
  req.operations = { ...req.operations, emailSending: "done" };
  res.json({ ...req.operations });
};

module.exports = {
  sendDemoMail,
};
