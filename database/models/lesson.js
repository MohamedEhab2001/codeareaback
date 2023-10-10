const { DataTypes } = require("sequelize");
const sequelize = require("../connect");

module.exports = () => {
  sequelize.define(
    "lesson",
    {
      material_url: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      assignment_url: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      quiz_url: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      number: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      chapter_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      tableName: "lesson",
      underscored: true,
    }
  );
};
