'use strict';
const TABLE_NAME = "pricing"
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
      lesson_id: {
        type: Sequelize.INTEGER
      },
      gross_price: {
        type: Sequelize.DECIMAL
      },
      net_price: {
        type: Sequelize.DECIMAL
      },
      duration: {
        type: Sequelize.TEXT
      },
      enabled: {
        type: Sequelize.BOOLEAN
      }
    })
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.dropTable(TABLE_NAME);
  }
};
