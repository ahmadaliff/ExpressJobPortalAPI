"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    return queryInterface.bulkInsert("Advertisements", [
      {
        title: "judulan",
        description:
          "description untuk description description untuk descriptiondescription untuk description",
        hrId: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: "judulan 2",
        description:
          "description untuk description description untuk descriptiondescription untuk description",
        hrId: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    return queryInterface.bulkDelete("Advertisements", null, {});
  },
};
