import Sequelize, { Model } from 'sequelize'

class Course extends Model {
  static init (sequelize) {
    super.init({ // campo Id é gerado automaticamente por isso não está aqui
      course: Sequelize.STRING
    },
    {
      sequelize,
      tableName: 'course' // Definindo o nome correto da tabela
    })
    return this
  }

  static associate (models) { // reacionamento um pra muitos, 1 course tem vários modules
    this.hasMany(models.Module, { foreignKey: 'id', as: 'module' })
  }
}
export default Course
