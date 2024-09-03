"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("tournament_clubs", {
      tournament_id: {
        type: Sequelize.INTEGER,
        references: {
          model: "tournaments",
          key: "id",
        },
        allowNull: false,
      },
      club_id: {
        type: Sequelize.INTEGER,
        references: {
          model: "clubs",
          key: "id",
        },
        allowNull: false,
      },
    });
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable("tournament_clubs");
  },
};
