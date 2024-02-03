const Vconnect = require("../helpers/vconnect");
const { models } = require("../database/connect");

const create = async (req, res, next) => {
  const vconnect = new Vconnect();
  let slot;
  if (!req.paid) {
    slot = await models.slot.findOne({
      where: {
        id: req.demo.slot_id,
      },
    });
  }
  const title = `${req.paid ? "Paid Session" : "Demo Session"} for ${
    req.body.st_name
  }`;
  const meeting_id = await vconnect.CreateMeeting(title);

  const session_id = await vconnect.MakeItScheduled(
    meeting_id,
    req.paid ? req.classes[0]?.appointment : slot?.appointment,
    title
  );
  const url = await vconnect.StartTheMeeting(session_id);
  req.meeting = {
    start_url: url,
    join_url: url,
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
  next(); // if paid createNextMeetingUrl || sendClasses
};

module.exports = {
  create,
};
