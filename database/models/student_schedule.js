const { DataTypes } = require("sequelize");
const sequelize = require("../connect");

module.exports = () => {
  const StudentSchedule = sequelize.define(
    "student_schedule",
    {
      studentId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      teacherScheduleId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      tableName: "student_schedule",
      underscored: true,
      timestamps: true,
    }
  );

  StudentSchedule.belongsTo(sequelize.models.teacher_schedule , {
    foreignKey : "teacher_schedule_id"
  })

  return StudentSchedule;
};
