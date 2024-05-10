const Sequelize = require("sequelize");
const sequelize = new Sequelize("new_schema", "root", "$udhiR1ag", {
  dialect: "mysql",
  port: 3306,
  host: "localhost",
});
module.exports = sequelize;
