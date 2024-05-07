'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.removeColumn('timeline', 'module_id')
    await queryInterface.removeColumn('timeline', 'course_id')
  }, // aqui vamos remover a coluna com o removeColumn...
  // (1a parâmetro é o nome da tabela que vamos excluir a coluna; 2a parâmetro é o nome da coluna que vamos excluir)

  // Já o down, como é o contrário do up, vamos adicionar a coluna, caso algo acima de errado. pra isso vamos usar o addColumn;
  async down (queryInterface, Sequelize) {
    await queryInterface.addColumn('timeline', 'module_id', {
      type: Sequelize.INTEGER,
      references: { model: 'module', key: 'id' },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL',
      allowNull: true
    })
    await queryInterface.addColumn('timeline', 'course_id', {
      type: Sequelize.INTEGER,
      references: { model: 'course', key: 'id' },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL',
      allowNull: true
    })
  }
}

// primeiro parâmetro do addColumn é a tabela em que vamos inserir a coluna e o 2a é como será a coluna.
// para o 2a parâmetro, utilizamos as mesmas caracteristicas inseridas na migration de criação dele.
