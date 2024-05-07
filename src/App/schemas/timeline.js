import mongoose from 'mongoose'

const TimelineSchema = new mongoose.Schema({ // isso está na documentação do Mongoose esse formato.
  lesson: [// dados dos produtos solicitados, como geralemnte é mais que um, fazemos um array e depois os objetos
    { // <id, name, price,category, url da imagem, quantidade d produto>
      id: {
        type: Number,
        required: true
      },
      lesson: {
        type: String,
        required: true
      },
      time: {
        type: String,
        required: true
      },
      module: {
        type: String,
        required: true
      },
      course: {
        type: String,
        required: true
      },
      weekday: {
        type: String,
        required: true
      }
    }],
  status: { // depois dados do status, true or false
    type: Boolean,
    required: true
  }
},
{
  timestamps: true // este aqui faz o created e o updated no mongoose
}
)

export default mongoose.model('Timeline', TimelineSchema) // por fim temos que exportar dessa forma
// este model o 1a parâmetro é qual vai ser o nome dele e o 2a parâmetro é o objeto que criamos lá em cima.
