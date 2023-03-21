const { Sequelize } = require("sequelize");

// exports.sequelize = new Sequelize(
//   "mysql://root:root@123@localhost:3306/biodata"
// );

exports.sequelize = new Sequelize("biodata", "root", "root123", {
  host: "localhost",
  dialect: "mysql",
});
