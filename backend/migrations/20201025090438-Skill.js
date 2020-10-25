'use strict';
const TABLE_NAME = "skill"
module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable(TABLE_NAME, {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      profile_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'profile',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      instrument_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'instrument',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      level: {
        type: Sequelize.TEXT
      },
      week_frequency: {
        type: Sequelize.INTEGER
      }
    })
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.dropTable(TABLE_NAME);
  }
};
