const Sequelize = require("sequelize");
const sequelize = require("../../config/database");

const Admin = sequelize.define(
  "Admin",
  {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      unique: true,
      primaryKey: true,
    },
    email: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    Is_active: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
    Last_Logged_In: {
      type: Sequelize.DATE,
      allowNull: true,
      defaultValue: null,
    },
    Admin_Name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
  },
  {
    timestamps: false,
  }
);
sequelize.sync();
module.exports = Admin;
