const { DataTypes } = require("sequelize");
const sequelize = require("../connect");

module.exports = () => {
  sequelize.define(
    "demoClass",
    {
      demo_app_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      teacher_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      teacher_duration: {
        type: DataTypes.DOUBLE,
        allowNull: true,
      },
      student_duration: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      teacher_join_time: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      student_join_time: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      st_focus_rate: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      comment: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      meeting_url: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      lesson_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      feedback_submitted: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
    },
    {
      tableName: "demo_class",
      underscored: true,
    }
  );
};
