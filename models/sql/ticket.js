const Sequelize = require("sequelize");
const sequelize = require("../../config/database");  
const Tickets = sequelize.define(
  "Tickets",
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    pos_id: {
      type: Sequelize.INTEGER,
      references: {
        model: "POS", 
        key: "id",
      },
      allowNull: false,
    },
    golfkart_id: {
      type: Sequelize.INTEGER,
      references: {
        model: "GolfKart",
        key: "id",
      },
      allowNull: false,
    },
    no_adults: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    no_children: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    is_gov_official: {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
    },
    is_foreigner: {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
    },
    total_amount: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    payment_method: {
      type: Sequelize.ENUM("Cash", "Online"),
      allowNull: false,
    },
    payment_status: {
      type: Sequelize.ENUM("FAIL", "SUCCESSFUL", "PENDING"),
      allowNull: false,
    },
    ticket_id: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
    },
    date_time: {
      type: Sequelize.DATE,
      defaultValue: Sequelize.NOW,
    },
  },
  {
    timestamps: false,
    tableName: "Tickets", 
  }
);

module.exports = Tickets;
