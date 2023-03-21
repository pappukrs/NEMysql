const { sequelize } = require("../database/db");

const { DataTypes } = require("sequelize");

exports.Person = sequelize.define("Person", {
  _id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      is: /^[a-zA-Z]+(\s[a-zA-Z]+)*$/, // Regular expression pattern for name with only one space allowed
      notEmpty: true,
    },
  },
  qualification: {
    type: DataTypes.STRING,
    validate: {
      notEmpty: true,
      len: [2, 10],
    },
  },
  height: {
    type: DataTypes.FLOAT,
    allowNull: false,
    validate: {
      min: 54,
      max: 251,
    },
  },
  weight: {
    type: DataTypes.FLOAT,
    allowNull: false,
    validate: {
      min: 2.13,
      max: 635,
    },
  },
  age: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  gender: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  country: {
    type: DataTypes.JSON,
    allowNull: true,
  },
});

// exports.Country = sequelize.define("Country", {
//   _id: {
//     type: DataTypes.INTEGER,
//     autoIncrement: true,
//     primaryKey: true,
//   },
//   country: {
//     type: DataTypes.STRING,
//     allowNull: false,
//   },
//   probability: {
//     type: DataTypes.FLOAT,
//     allowNull: false,
//   },

//   // foreign key to Person
//   personId: {
//     type: DataTypes.INTEGER,
//     allowNull: false,
//     references: {
//       model: exports.Person,
//       key: "_id",
//     },
//     onDelete: "CASCADE",
//   },
// });

// exports.Person.hasMany(exports.Country, { foreignKey: "personId" });
// exports.Country.belongsTo(exports.Person, { foreignKey: "personId" });
