const Zoom = require("../helpers/zoom");
const { models } = require("../database/connect");
const { default: axios } = require("axios");

const create = async (req, res, next) => {
  const z = new Zoom();
  await z.setToken();
  const token = await z.getValidToken();
  const slot = await models.slot.findOne({
    where: {
      id: req.demo.slot_id,
    },
  });
  const meetingObj = {
    agenda: "My Meeting",
    default_password: false,
    duration: 40,
    password: "123456",
    pre_schedule: false,
    schedule_for: "codearea.eg@gmail.com",
    start_time: slot.appointment,
    timezone: "Africa/Cairo",
    topic: "My Meeting",
    type: 2,
  };

  const response = await axios.post(
    `${process.env.ZOOM_BASE}users/me/meetings`,
    meetingObj,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  req.meeting = {
    start_url: response.data.start_url,
    join_url: response.data.join_url,
  };
  req.operations = { ...req.operations, createMeeting: "done" };
  next();
};

module.exports = {
  create,
};
