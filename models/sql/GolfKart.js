const Sequelize = require("sequelize");
const sequelize = require("../../config/database"); // Adjust the import path to your configuration

// Define the Golf Kart model
const GolfKart = sequelize.define(
  "GolfKart",
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    golfkart_id: {
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
    rtmp_url: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    rtmp_key: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    capacity: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    driver_name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    driver_phone_number: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    is_active: {
      type: Sequelize.BOOLEAN,
      defaultValue: true,
    },
  },
  {
    timestamps: false,
    tableName: "GolfKart",
  }
);

module.exports = GolfKart;
