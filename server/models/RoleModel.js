const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Role = sequelize.define("Role", {
  roleName: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
  },
  permissions: {
    type: DataTypes.JSON,
    allowNull: false,
  },
  isActive: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
    allowNull: false,
  },
});

module.exports = Role;
