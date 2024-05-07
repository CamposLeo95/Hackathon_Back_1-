'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    // Adiciona as colunas 'module' e 'course_id' na tabela 'lesson'
    await queryInterface.addColumn('lesson', 'course_id', {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'course',
        key: 'id',
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      }
    })

    // Alterar a tabela Module para adicionar a relação com Course
    await queryInterface.addColumn('lesson', 'module_id', {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'module',
        key: 'id',
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      }
    })
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('lesson', 'course_id')
    await queryInterface.removeColumn('lesson', 'module_id')
  }
}
