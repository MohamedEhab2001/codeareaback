const { DataTypes } = require("sequelize");
const sequelize = require("../connect");

module.exports = () => {
  const PaidClass = sequelize.define(
    "paid_class",
    {
      teacher_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      appointment: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      student_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      canceled: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      teacher_duration: {
        type: DataTypes.REAL,
      },
      student_duration: {
        type: DataTypes.REAL,
      },
      teacher_join_time: {
        type: DataTypes.DATE,
      },
      student_join_time: {
        type: DataTypes.DATE,
      },
      lesson_id: {
        type: DataTypes.INTEGER,
      },
      st_focus_rate: {
        type: DataTypes.INTEGER,
      },
      comment: {
        type: DataTypes.STRING,
      },
      custom_assignment: {
        type: DataTypes.BOOLEAN,
      },
      assignment: {
        type: DataTypes.STRING,
      },
      assignment_rate: {
        type: DataTypes.INTEGER,
      },
      meeting_url: {
        type: DataTypes.STRING,
      },
    },
    {
      tableName: "paid_class",
      underscored: true,
      timestamps: true,
    }
  );

  return PaidClass;
};
