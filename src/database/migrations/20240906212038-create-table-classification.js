"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("standings", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      club_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "clubs",
          key: "id",
        },
      },
      tournament_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "tournaments",
          key: "id",
        },
      },
      phase_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: "phases",
          key: "id",
        },
      },
      games: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },
      points: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },
      wins: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },
      draws: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },
      losses: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },
      points_pro: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },
      points_score: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },
      percent_points: {
        type: Sequelize.FLOAT,
        defaultValue: 0.0,
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW,
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW,
      },
    });
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable("standings");
  },
};
