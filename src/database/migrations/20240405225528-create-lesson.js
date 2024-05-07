'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('lesson', {
      id: {
        type: Sequelize.INTEGER, // número inteiro
        allowNull: false, // campo nulo = não
        autoIncrement: true, // ele vai dar sequencia no id, cria automatico
        primaryKey: true // chave primaria
      },
      lesson: {
        type: Sequelize.STRING,
        allowNull: false, // campo nulo = não, todos tem que ter nome da aula
        unique: true // tem que ser único, não pode ter outro aula igual
      },
      time: {
        type: Sequelize.STRING,
        allowNull: false // campo nulo = não, todos tem que ter tempo de duração
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false
      }
    })
  },

  async down (queryInterface) {
    await queryInterface.dropTable('lesson')
  }
}
