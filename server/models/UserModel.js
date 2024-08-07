const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const bcrypt = require("bcrypt");
const Role = require("./RoleModel");

const User = sequelize.define("User", {
  firstName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  middleName: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  lastName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  isActive: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

// Assosiations
User.belongsTo(Role, {
  foreignKey: "roleId",
  as: "role",
});
Role.hasMany(User, {
  foreignKey: "roleId",
  as: "users",
});

// Bcrypt the password before saving the user
User.beforeCreate(async (user) => {
  user.password = await bcrypt.hash(user.password, 10);
});

// Hash Password before updating a user
User.beforeUpdate(async (user) => {
  if (user.changed("password")) {
    user.password = await bcrypt.hash(user.password, 10);
  }
});

module.exports = User;
