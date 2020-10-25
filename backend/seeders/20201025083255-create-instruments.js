'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('instrument', [
      {
        name: 'piano'
      },
      {
        name: 'guitar'
      },
      {
        name: 'violin'
      },
      {
        name: 'cello'
      },
      {
        name: 'ukulele'
      },
      {
        name: 'flute'
      },
      {
        name: 'saxophone'
      },
      {
        name: 'bass guitar'
      },
      {
        name: 'viola'
      },
      {
        name: 'voice'
      },
      {
        name: 'trumpet'
      },
      {
        name: 'drums'
      },
      {
        name: 'bassoon'
      },
      {
        name: 'trombone'
      },
      {
        name: 'upright bass'
      }
    ]);
  },
  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
