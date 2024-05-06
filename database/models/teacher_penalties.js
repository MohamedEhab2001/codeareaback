const { DataTypes } = require("sequelize");
const sequelize = require("../connect");

module.exports = () => {
  const Teacher = sequelize.define(
    "teacher_penalties",
    {
      reason: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      teacher_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      amount: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      tableName: "teacher_penalties",
      underscored: true,
      timestamps: true,
    }
  );

  return Teacher;
};
