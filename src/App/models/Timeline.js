import Sequelize, { Model } from 'sequelize'

class Timeline extends Model {
  static init (sequelize) {
    super.init({ // campo Id é gerado automaticamente por isso não está aqui
      lesson_id: Sequelize.INTEGER,
      weekday_id: Sequelize.INTEGER,
      status: Sequelize.BOOLEAN
    },
    {
      sequelize,
      tableName: 'timeline' // Definindo o nome correto da tabela
    })
    return this
  }

  static associate (models) { // reacionamento, 1 aula para 1 dia da semana, ou seja, uma aula não pode ter dois dias da semana
    this.belongsTo(models.Lesson, { foreignKey: 'lesson_id', as: 'lesson' })
    this.belongsTo(models.Weekdays, { foreignKey: 'weekday_id', as: 'weekday' }) // belongsto=pertence
    // this.belongsTo(models.Module, { foreignKey: 'module_id', as: 'module' })
    // this.belongsTo(models.Course, { foreignKey: 'course_id', as: 'course' })
    // além disso precisamos avisar o index.js (database) sobre o relacionamento
  }
}
export default Timeline
