const Zoho = require("../helpers/Mail");
const { default: axios } = require("axios");
const {
  DemoTemplate,
  PayementTemplate,
  TechTemplate,
  RenewTemplate,
} = require("../static");
const moment = require("moment-timezone");

const prepareDemoMessage = async (req, res, next) => {
  req.demo = { ...req.body };
  req.meeting = { ...req.body.meeting };
  req.start = req.body.start;
  next();
};

const sendDemoMail = async (req, res) => {
  const zoho = new Zoho();
  const token = await zoho.TestToken();
  const redered = DemoTemplate({
    parent_name: req.demo.parent_name,
    email: req.demo.parent_email,
    date: moment.tz(req.start, req.body.timeZone).format("MMM Do YY"),
    time: moment.tz(req.start, req.body.timeZone).format("h:mm a"),
    meeting: req.meeting.join_url,
    number: req.demo_number || "",
    kid: req.demo.st_name,
    password: req.password || "",
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

const sendPaymenMail = async (req, res) => {
  const zoho = new Zoho();
  const token = await zoho.TestToken();
  const redered = PayementTemplate({
    parent_name: req.body.parent_name,
    email: req.body.parent_email,
    meeting: req.body.payment,
    number: req.body.number || "",
    kid: req.body.st_name,
    password: req.body.password || "",
  });
  await axios.post(
    `https://mail.zoho.com/api/accounts/${process.env.ZOHO_ACCOUNT_ID}/messages`,
    {
      fromAddress: "service@codearea.uk",
      toAddress: req.body.email_address,
      subject: "Payment Request",
      content: redered,
    },
    {
      headers: {
        Authorization: `Zoho-oauthtoken ${token}`,
      },
    }
  );
  res.json({ msg: "done" });
};

const sendTechMail = async (req, res) => {
  const zoho = new Zoho();
  const token = await zoho.TestToken();
  const redered = TechTemplate({
    parent_name: req.body.parent_name,
    updates: req.body.updates,
  });
  await axios.post(
    `https://mail.zoho.com/api/accounts/${process.env.ZOHO_ACCOUNT_ID}/messages`,
    {
      fromAddress: "tech@codearea.uk",
      toAddress: req.body.email_address,
      subject: "Technical update",
      content: redered,
    },
    {
      headers: {
        Authorization: `Zoho-oauthtoken ${token}`,
      },
    }
  );
  res.json({ msg: "done" });
};

const sendRenewMail = async (req, res) => {
  const zoho = new Zoho();
  const token = await zoho.TestToken();
  const redered = RenewTemplate({
    parent_name: req.body.parent_name,
    email: req.body.parent_email,
    meeting: req.body.payment,
    number: req.body.number || "",
    kid: req.body.st_name,
  });
  await axios.post(
    `https://mail.zoho.com/api/accounts/${process.env.ZOHO_ACCOUNT_ID}/messages`,
    {
      fromAddress: "service@codearea.uk",
      toAddress: req.body.email_address,
      subject: "Renew for " + req.body.st_name,
      content: redered,
    },
    {
      headers: {
        Authorization: `Zoho-oauthtoken ${token}`,
      },
    }
  );
  res.json({ msg: "done" });
};




module.exports = {
  prepareDemoMessage,
  sendDemoMail,
  sendPaymenMail,
  sendTechMail,
  sendRenewMail,
};
