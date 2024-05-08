'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('Aulas', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
      },
      module: {
        type: Sequelize.STRING,
        allowNull: false

      },
      course: {
        type: Sequelize.STRING,
        allowNull: false

      },
      lesson: {
        type: Sequelize.STRING,
        allowNull: false

      },
      time: {
        type: Sequelize.STRING,
        allowNull: false
      },
      status: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
        allowNull: false
      },
      id_day: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false
      }
    })
  },

  async down (queryInterface) {
    await queryInterface.dropTable('Aulas')
  }
}
