const Sequelize = require("sequelize");
const sequelize = require("../../config/database");
const POS = sequelize.define(
  "POS",
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    pos_id: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
    },
    pos_name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    pos_key: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
    },
    city: {
      type: Sequelize.INTEGER,
      references: {
        model: "City",
        key: "id",
      },
      allowNull: false,
    },
    is_active: {
      type: Sequelize.BOOLEAN,
      defaultValue: true,
    },
  },
  {
    timestamps: false,
    tableName: "POS", 
  }
);

module.exports = POS;
