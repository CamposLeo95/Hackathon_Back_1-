import Sequelize, { Model } from 'sequelize'

class Course extends Model {
  static init (sequelize) {
    super.init({ // campo Id é gerado automaticamente por isso não está aqui
      course: Sequelize.STRING
    },
    {
      sequelize,
      tableName: 'Course' // Definindo o nome correto da tabela
    })
    return this
  }
}
export default Course
