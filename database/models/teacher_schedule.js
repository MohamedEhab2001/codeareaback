const { DataTypes } = require("sequelize");
const sequelize = require("../connect");

module.exports = () => {
  const TeacherSchedule = sequelize.define(
    "teacher_schedule",
    {
      teacher_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      available: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
        allowNull: false,
      },
      day: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      time: {
        type: DataTypes.TIME,
        allowNull: false,
      },
    },
    {
      tableName: "teacher_schedule",
      underscored: true,
      timestamps: true,
    }
  );

  TeacherSchedule.belongsTo(sequelize.models.teacher, {
    foreignKey: "teacher_id",
  });
  
  return TeacherSchedule;
};
