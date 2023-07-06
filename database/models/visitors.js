const { DataTypes } = require("sequelize");
const sequelize = require("../connect");

module.exports = () => {
  sequelize.define(
    "visitors",
    {
      ip: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true,
      },
      currency_code: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      calling_code: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      country_code: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      region_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      city: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      language_code: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      timezone_id: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      device_type: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      os_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      is_attacker: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
      is_vpn: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
      is_threat: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
    },
    {
      tableName: "visitors",
      underscored: true,
    }
  );
};
