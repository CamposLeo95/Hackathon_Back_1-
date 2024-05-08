import Sequelize, { Model } from 'sequelize'

class Aula extends Model {
  static init (sequelize) {
    super.init({
      module: Sequelize.STRING,
      course: Sequelize.STRING,
      lesson: Sequelize.STRING,
      time: Sequelize.STRING,
      id_day: Sequelize.INTEGER,
      status: Sequelize.BOOLEAN
    },
    {
      sequelize
    })
    return this
  }
}

export default Aula
