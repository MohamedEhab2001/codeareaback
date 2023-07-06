const { DataTypes } = require("sequelize");
const sequelize = require("../connect");

module.exports = () => {
  sequelize.define(
    "slot",
    {
      appointment: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      tableName: "slot",
      underscored: true,
    }
  );
};
