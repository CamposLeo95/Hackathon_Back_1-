import Sequelize, { Model } from 'sequelize'

class Lesson extends Model {
  static init (sequelize) {
    super.init({ // campo Id é gerado automaticamente por isso não está aqui
      lesson: Sequelize.STRING,
      time: Sequelize.STRING
    },
    {
      sequelize,
      tableName: 'lesson' // Definindo o nome correto da tabela
    })
    return this
  }

  static associate (models) { // reacionamento, 1 aula para 1 dia da semana, ou seja, uma aula não pode ter dois dias da semana
    this.belongsTo(models.Module, { foreignKey: 'module_id', as: 'module' })
    this.belongsTo(models.Course, { foreignKey: 'course_id', as: 'course' })
  }
}

export default Lesson
