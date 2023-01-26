const { slot_availabilty_count } = require("../database/queries");
const sequalize = require("../database/connect");
const { QueryTypes } = require("sequelize");

const sendAvailabilty = async (req, res) => {
  const slots = await sequalize.query(slot_availabilty_count(), {
    type: QueryTypes.SELECT,
  });
  res.status(200).json({
    slots,
  });
};

module.exports = { sendAvailabilty };
