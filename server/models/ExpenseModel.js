const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const User = require("./UserModel");

const Expense = sequelize.define("Expense", {
  description: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  amount: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  date: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  isActive: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
    allowNull: false,
  },
});

// Assosciation
Expense.belongsTo(User, {
  foreignKey: "userId",
  as: "user",
});
User.hasMany(Expense, {
  foreignKey: "userId",
  as: "expenses",
});

module.exports = Expense;
