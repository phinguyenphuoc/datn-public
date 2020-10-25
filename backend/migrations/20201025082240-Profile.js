'use strict';
const TABLE_NAME = "profile"
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable(TABLE_NAME, {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      user_id: {
        type: Sequelize.TEXT
      },
      address: {
        type: Sequelize.TEXT
      },
      background: {
        type: Sequelize.DataTypes.ARRAY(Sequelize.DataTypes.TEXT)
      },
      birth_date: {
        type: Sequelize.DATE
      },
      experience: {
        type: Sequelize.DataTypes.ARRAY(Sequelize.DataTypes.TEXT)
      },
      first_name: {
        type: Sequelize.TEXT
      },
      last_name: {
        type: Sequelize.TEXT
      },
      phone_number: {
        type: Sequelize.TEXT
      },
      about: {
        type: Sequelize.TEXT
      },
      pickup_line: {
        type: Sequelize.TEXT
      }
    })
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable(TABLE_NAME);
  }
};
