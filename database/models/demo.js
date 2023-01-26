const { DataTypes } = require("sequelize");
const sequelize = require("../connect");

module.exports = () => {
  sequelize.define(
    "demoApp",
    {
      country: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      st_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      st_age: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      st_gender: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      parent_email: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      parent_phone: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      slot_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
    },
    {
      tableName: "demo_app",
      underscored: true,
    }
  );
};
