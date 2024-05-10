const Sequelize = require("sequelize");
const sequelize = require("../../config/database");

const City = sequelize.define(
  "City",
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    city_name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    is_active: {
      type: Sequelize.BOOLEAN,
      defaultValue: true,
      allowNull: false,
    },
  },
  {
    timestamps: false,
    tableName: "City", 
  }
);

module.exports = City;
