const { DataTypes } = require("sequelize");
const sequelize = require("../connect");

module.exports = () => {
  sequelize.define(
    "zoho",
    {
      access_token: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      scope: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      tableName: "zoho",
      underscored: true,
    }
  );
};
