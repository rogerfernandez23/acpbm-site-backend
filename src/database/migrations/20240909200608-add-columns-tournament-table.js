"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn("tournaments", "teams_group", {
      type: Sequelize.INTEGER,
      allowNull: true,
    });

    await queryInterface.addColumn("tournaments", "teams_qualified", {
      type: Sequelize.INTEGER,
      allowNull: true,
    });

    await queryInterface.addColumn("tournaments", "teams_next_round", {
      type: Sequelize.INTEGER,
      allowNull: true,
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn("tournaments", "teams_group");
    await queryInterface.removeColumn("tournaments", "teams_qualified");
    await queryInterface.removeColumn("tournaments", "teams_next_round");
  },
};
