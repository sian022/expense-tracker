"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn("Expenses", "userId", {
      type: Sequelize.INTEGER,
      allowNull: true,
      references: {
        model: "Users", // name of the target model
        key: "id", // key in the target model
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn("Expenses", "userId");
  },
};
