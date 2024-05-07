import Sequelize, { Model } from 'sequelize'

class Weekdays extends Model {
  static init (sequelize) {
    super.init({ // campo Id é gerado automaticamente por isso não está aqui
      name: Sequelize.STRING
    },
    {
      sequelize
    })
    return this
  }

  static associate (models) { // reacionamento um pra muitos, 1 dia da semana pode ter tem vários aulas
    this.hasMany(models.Lesson, { foreignKey: 'id', as: 'lesson' })
  }
}

export default Weekdays
