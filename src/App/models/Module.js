import Sequelize, { Model } from 'sequelize'

class Module extends Model {
  static init (sequelize) {
    super.init({ // campo Id é gerado automaticamente por isso não está aqui
      module: Sequelize.STRING
    },
    {
      sequelize,
      tableName: 'Module' // Definindo o nome correto da tabela
    })
    return this
  }

  static associate (models) { // reacionamento, 1 módulo para 1 course, ou seja, um módulo não pode ter dois cursos
    this.belongsTo(models.Course, { foreignKey: 'course_id', as: 'course' })
  }
}
export default Module
