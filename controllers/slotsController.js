const {
  slot_availabilty_count,
  getTeacherDemoSlots,
} = require("../database/queries");
const sequalize = require("../database/connect");
const { models } = require("../database/connect");
const { QueryTypes, Op } = require("sequelize");

const sendAvailabilty = async (req, res) => {
  const slots = await sequalize.query(slot_availabilty_count(), {
    type: QueryTypes.SELECT,
  });
  res.status(200).json({
    slots,
  });
};

const getFutureSlots = async (req, res) => {
  const { id } = req.query;
  const slots = await sequalize.query(getTeacherDemoSlots(id), {
    type: QueryTypes.SELECT,
  });
  res.status(200).json({
    slots,
  });
};

const createSlotAvailabilty = async (req, res) => {
  const slot = await models.slot_availablity.create(req.body);

  res.status(200).json({
    slot,
  });
};
module.exports = { sendAvailabilty, getFutureSlots, createSlotAvailabilty };
