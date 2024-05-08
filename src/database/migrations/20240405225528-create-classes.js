'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('Classes', {
      id: {
        type: Sequelize.INTEGER, // número inteiro
        allowNull: false, // campo nulo = não
        autoIncrement: true, // ele vai dar sequencia no id, cria automatico
        primaryKey: true // chave primaria
      },
      lesson: {
        type: Sequelize.STRING,
        allowNull: false // campo nulo = não, todos tem que ter nome da aula
      },
      time: {
        type: Sequelize.STRING,
        allowNull: false // campo nulo = não, todos tem que ter tempo de duração
      },
      status: {
        type: Sequelize.BOOLEAN,
        defaultValue: false, // se não mandar informação nenhuma o valor dele vai ser falso
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
    await queryInterface.dropTable('Classes')
  }
}
