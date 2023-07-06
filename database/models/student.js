const { DataTypes } = require("sequelize");
const sequelize = require("../connect");

module.exports = () => {
  const Student = sequelize.define(
    "student",
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      parent_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      parent_email: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      parent_phone: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      purchase_number: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      gender: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      birthday: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      teacher_id: {
        type: DataTypes.STRING,
        allowNull: true,
      },

      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      paid: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
    },
    {
      tableName: "student",
      underscored: true,
    }
  );
  Student.belongsTo(sequelize.models.teacher, {
    foreignKey: "teacher_id",
  });
  return Student;
};
