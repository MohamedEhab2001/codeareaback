const Zoom = require("../helpers/zoom");
const { models } = require("../database/connect");
const { default: axios } = require("axios");

const create = async (req, res, next) => {
  const z = new Zoom();
  await z.setToken();
  const token = await z.getValidToken();
  let slot;
  if (!req.paid) {
    slot = await models.slot.findOne({
      where: {
        id: req.demo.slot_id,
      },
    });
  }
  const meetingObj = {
    agenda: `${req.paid ? "Paid Session" : "Demo Session"} for ${
      req.body.st_name
    }`,
    default_password: false,
    duration: 110,
    password: "123456",
    pre_schedule: false,
    schedule_for: "codearea.eg@gmail.com",
    start_time: req.paid ? req.classes[0]?.appointment : slot?.appointment,
    timezone: "UTC",
    topic: `${req.paid ? "Paid Session" : "Demo Session"} for ${
      req.body.st_name
    }`,
    type: 2,
    participant_name: req.body.st_name,
  };

  console.log(`Bearer ${token}`);
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
  if (!req.paid) {
    req.start = slot?.appointment;
    req.operations = { ...req.operations, createMeeting: "done" };
  }
  if (req.paid) {
    await models.paid_class.update(
      {
        meeting_url: req.meeting.join_url,
      },
      {
        where: {
          id: req.classes[0].id,
        },
      }
    );
  }
  res.status(200).json(token);
  next(); // if paid createNextMeetingUrl || sendClasses
};

module.exports = {
  create,
};
