'use strict';
const TABLE_NAME = "media"
module.exports = {
  up: (queryInterface, Sequelize) => {
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
      type: {
        type: Sequelize.TEXT,
      },
      tag: {
        type: Sequelize.TEXT,
      },
      url: {
        type: Sequelize.TEXT,
      }
    })
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable(TABLE_NAME);
  }
};
