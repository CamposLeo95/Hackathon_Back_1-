'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('timeline', {
      id: { // copiamos do classes
        type: Sequelize.INTEGER, // número inteiro
        allowNull: false, // campo nulo = não
        autoIncrement: true, // ele vai dar sequencia no id, cria automatico
        primaryKey: true // chave primaria
      },
      status: {
        type: Sequelize.BOOLEAN,
        allowNull: false, // campo nulo = não, todos tem que ter nome
        defaultValue: true // se não mandar informação nenhuma o valor dele vai ser falso
      },
      lesson_id: {
        type: Sequelize.INTEGER, // 2a parâmetro é o nome da coluna que vc vai adicionar; 3a parâmetro é o conteúdo dessa coluna,dados,caracteristicas;
        references: { model: 'lesson', key: 'id' }, // depois do tipo (type) colocamos o references para referenciar ela a outra tabela; neste usamos 02 parâmetros
        // 1a o model que indica qual tabela vamos fazer o relacionamento; 2a é o campo que terá alusão com esta tabela (Id da weekday vai dentro da tabela classes)
        onUpdate: 'CASCADE', // quando atualizar a tabela weekday, a nossa tabela classes vai atualizar também, em movimento de cascata
        onDelete: 'SET NULL', // Caso eu delete um dia da semana na tabela weekday, aqui na classes vai ficar nulo
        allowNull: true // campo nulo, sim, podemos ter esse campo nulo;
      },
      weekday_id: {
        type: Sequelize.INTEGER, // 2a parâmetro é o nome da coluna que vc vai adicionar; 3a parâmetro é o conteúdo dessa coluna,dados,caracteristicas;
        references: { model: 'weekdays', key: 'id' }, // depois do tipo (type) colocamos o references para referenciar ela a outra tabela; neste usamos 02 parâmetros
        // 1a o model que indica qual tabela vamos fazer o relacionamento; 2a é o campo que terá alusão com esta tabela (Id da weekday vai dentro da tabela classes)
        onUpdate: 'CASCADE', // quando atualizar a tabela weekday, a nossa tabela classes vai atualizar também, em movimento de cascata
        onDelete: 'SET NULL', // Caso eu delete um dia da semana na tabela weekday, aqui na classes vai ficar nulo
        allowNull: true // campo nulo, sim, podemos ter esse campo nulo;
      },
      module_id: {
        type: Sequelize.INTEGER, // 2a parâmetro é o nome da coluna que vc vai adicionar; 3a parâmetro é o conteúdo dessa coluna,dados,caracteristicas;
        references: { model: 'module', key: 'id' }, // depois do tipo (type) colocamos o references para referenciar ela a outra tabela; neste usamos 02 parâmetros
        // 1a o model que indica qual tabela vamos fazer o relacionamento; 2a é o campo que terá alusão com esta tabela (Id da weekday vai dentro da tabela classes)
        onUpdate: 'CASCADE', // quando atualizar a tabela weekday, a nossa tabela classes vai atualizar também, em movimento de cascata
        onDelete: 'SET NULL', // Caso eu delete um dia da semana na tabela weekday, aqui na classes vai ficar nulo
        allowNull: true // campo nulo, sim, podemos ter esse campo nulo;
      },
      course_id: {
        type: Sequelize.INTEGER, // 2a parâmetro é o nome da coluna que vc vai adicionar; 3a parâmetro é o conteúdo dessa coluna,dados,caracteristicas;
        references: { model: 'course', key: 'id' }, // depois do tipo (type) colocamos o references para referenciar ela a outra tabela; neste usamos 02 parâmetros
        // 1a o model que indica qual tabela vamos fazer o relacionamento; 2a é o campo que terá alusão com esta tabela (Id da weekday vai dentro da tabela classes)
        onUpdate: 'CASCADE', // quando atualizar a tabela weekday, a nossa tabela classes vai atualizar também, em movimento de cascata
        onDelete: 'SET NULL', // Caso eu delete um dia da semana na tabela weekday, aqui na classes vai ficar nulo
        allowNull: true // campo nulo, sim, podemos ter esse campo nulo;
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
    await queryInterface.dropTable('timeline')
  }
}
