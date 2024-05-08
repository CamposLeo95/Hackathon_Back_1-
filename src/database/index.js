import Sequelize from 'sequelize'
import Aula from '../App/models/Aula.js'
import Class from '../App/models/Class.js'
import Course from '../App/models/Course.js'
import Habits from '../App/models/Habits.js'
import Module from '../App/models/Module.js'
import User from '../App/models/User.js'
import Weekdays from '../App/models/Weekdays.js'

const models = [User, Class, Weekdays, Habits, Module, Course, Aula]
class Database {
  constructor () { // Toda vez que a minha classe DataBase for instanciada o método constructor é chamado automaticamente e ele chama os métodos abaixo
    this.init() // método initi ele faz a conexão dos models do Postgres
    // this.mongo() // método mongo faz conexão com o mongoDB, se for usarmos mongo usamos este this
  }

  init () {
    this.connection = new Sequelize('postgresql://postgres:etQaFMGkKUCBlhyYSvDWVFLIRSswWvXq@viaduct.proxy.rlwy.net:27951/railway') // to instanciando meu sequelize // clicando o ctrl+init ali em verde ele vai pra pasta de user.js
    models.map(model => model.init(this.connection)).map(model => model.associate && model.associate(this.connection.models))
  } // segundo map é para fazer o relacionamento  // quero verificar dentro de cada model se existe o método associate, caso tenha (if &&) vou criar a conexão pelo
  // this.conecction.models;
}

// mongo () { // fazendo a conexão com o MongoDb com a ajuda do mongoose
// this.mongoConnection = mongoose.connect('mongodb://mongo:2A-aedAAHcEFBDDCd4-aaG4egcbG6Fha@viaduct.proxy.rlwy.net:48672')
// }  a documentação do mongo pede que seja assim 'mongodb://localhost' + porta + o nome do banco de dados
// } baixamos o MongoDB Compass para visualizar os dados do banco de dados do MongoDB; ele já achou o code burger conforme feito acima

export default new Database() // já vai instanciado
