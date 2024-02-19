'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('clubs', {
     id:  {
      type: Sequelize.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    club_name: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
    },
    club_user: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    abreviate_name: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        len: [3, 3]
      }
    },
    path: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    created_at: {
      type: Sequelize.DATE,
      allowNull: false
    },
    updated_at: {
      type: Sequelize.DATE,
      allowNull: false
    },
    })
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable('clubs');
  },
}
