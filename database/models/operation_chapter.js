const { DataTypes } = require("sequelize");
const sequelize = require("../connect");

module.exports = () => {
  sequelize.define(
    "operation_chapter",
    {
      operationId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      chapterId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
    },
    {
      tableName: "operation_chapter",
      underscored: true,
      timestamps: true,
    }
  );
};
