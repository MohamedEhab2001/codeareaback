const { DataTypes } = require("sequelize");
const sequelize = require("../connect");

module.exports = () => {
  sequelize.define(
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
    },
    {
      tableName: "student",
      underscored: true,
    }
  );
};
