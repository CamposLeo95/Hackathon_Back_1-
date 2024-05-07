/* eslint-disable camelcase */
import * as Yup from 'yup'
import Course from '../models/Course'
import Lesson from '../models/Lesson'
import Module from '../models/Module'
import Timeline from '../models/Timeline'
import Weekdays from '../models/Weekdays'

class TimelineController {
  async store (request, response) {
    const schema = Yup.object().shape({ // formato do objeto abaixo:
      lesson_id: Yup.number().integer().required(),
      weekday_id: Yup.number().integer().required(),
      status: Yup.boolean()
    })
    console.log(request.body)

    // caso ele não atenda ao formato exigido acima ele vai dar erro conforme no UserControllers, dizendo o que está de errado
    try {
      await schema.validateSync(request.body, { abortEarly: false })
    } catch (err) {
      return response.status(400).json({ error: err.errors })
    }

    const { status, lesson_id, weekday_id } = request.body
    // Crie uma nova entrada no cronograma
    const novaEntrada = await Timeline.create({
      status,
      lesson_id,
      weekday_id
    })

    return response.status(201).json(novaEntrada)
  }

  async index (request, response) {
    const cronograma = await Timeline.findAll({ // procure todos as aulas dentro dessa variavel //após criar o relacionamento, dentro dos parênteses vamos adicionar:
      include: [ // vamos incluir os itens abaixo:
        {
          model: Weekdays, // vamos pegar do model Weekdays
          as: 'weekday', // vamos chama-lo de weekday
          attributes: ['id', 'name'] // e vamos pegar os itens id e name apenas
        },
        {
          model: Lesson,
          as: 'lesson',
          attributes: ['lesson', 'time'],
          include: [
            {
              model: Module,
              as: 'module',
              attributes: ['id', 'module', 'course_id']
            },
            {
              model: Course,
              as: 'course',
              attributes: ['course']
            }]
        }
      ]
    })

    console.log(cronograma)

    return response.json(cronograma) // retorna todos as aulas
  }

  async update (request, response) {
    try {
      const schema = Yup.object().shape({ // formato do objeto abaixo:
        lesson_id: Yup.number().integer(),
        weekday_id: Yup.number().integer(),
        status: Yup.boolean()
      })

      // caso ele não atenda ao formato exigido acima ele vai dar erro conforme no UserControllers, dizendo o que está de errado
      try {
        await schema.validateSync(request.body, { abortEarly: false })
      } catch (err) {
        return response.status(400).json({ error: err.errors })
      }

      const { lesson_id, weekday_id, status } = request.body
      const { id } = request.params

      // vamos verificar se o ID está correto antes da alteração:
      const lesson = await Timeline.findByPk(id)
      if (!lesson) {
        return response.status(401).json({ error: 'Make sure your ID is correct' })
      }

      await Timeline.update({ lesson_id, weekday_id, status }, { where: { id } })

      return response.status(200).json({ message: 'Update made successfully' })
    } catch (err) {
      return response.status(400).json({ error: err.errors })
    }
  }
}
export default new TimelineController()
