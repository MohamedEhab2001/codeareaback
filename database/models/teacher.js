const { DataTypes } = require("sequelize");
const sequelize = require("../connect");

module.exports = () => {
  const Teacher = sequelize.define(
    "teacher",
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      gender: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      private_email: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      address: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      tableName: "teacher",
      underscored: true,
      timestamps: true,
    }
  );

  return Teacher;
};
