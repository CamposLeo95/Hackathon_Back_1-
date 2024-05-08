/* eslint-disable camelcase */

import * as Yup from 'yup'
import Class from '../models/Class.js'
import Module from '../models/Module.js'
import User from '../models/User.js'
import Weekdays from '../models/Weekdays.js'

class ClassController {
  async store (request, response) {
    const schema = Yup.object().shape({
      module_id: Yup.number(),
      lesson: Yup.string().required(),
      time: Yup.string().required(),
      status: Yup.boolean(),
      weekday_id: Yup.number()
    })

    try {
      await schema.validateSync(request.body, { abortEarly: false })
    } catch (err) {
      return response.status(400).json({ error: err.errors })
    }

    const { admin: isAdmin } = await User.findByPk(request.userId)
    if (!isAdmin) {
      return response.status(401).json()
    }

    const { module_id, lesson, time, status, weekday_id } = request.body

    try {
      const classDev = await Class.create({
        module_id,
        lesson,
        time,
        status,
        weekday_id
      })

      return response.json(classDev)
    } catch (error) {
      return response.status(500).json({ error: 'Ocorreu um erro ao processar a solicitação.' })
    }
  }

  async index (request, response) {
    const classDev = await Class.findAll({
      include: [
        {
          model: Weekdays,
          as: 'weekday',
          attributes: ['id', 'name']
        },
        {
          model: Module,
          as: 'module',
          attributes: ['id', 'module']
        }
      ]
    })

    console.log(request.userId)

    return response.json(classDev) // retorna todos as aulas
  }

  async update (request, response) { // copiamos o store lá de cima pra ficar mais prático
    const schema = Yup.object().shape({ // formato do objeto abaixo:
      module_id: Yup.number(), // após criar o relacionamento, alteraremos o "module: Yup.string()" para "YUP.number"
      lesson: Yup.string(),
      time: Yup.string(),
      weekday_id: Yup.number() // após criar o relacionamento, alteraremos o "module: Yup.string()" para "YUP.number"
    })

    // caso ele não atenda ao formato exigido acima ele vai dar erro conforme no UserControllers, dizendo o que está de errado
    try {
      await schema.validateSync(request.body, { abortEarly: false })
    } catch (err) {
      return response.status(400).json({ error: err.errors })
    }

    // após as validações vamos verificar se o ID digitado para a alteração é um ID válido
    const id = request.params.id
    const classDev = await Class.findByPk(id)
    if (!classDev) {
      return response.status(401).json({ error: 'Make sure your class ID is correct' })
    }

    const { module_id, lesson, time, status, weekday_id } = request.body

    await Class.update({
      module_id,
      lesson,
      time,
      status,
      weekday_id
    },
    { where: { id } }
    )

    return response.status(200).json({ message: 'Class was updated' })
  }
}

export default new ClassController()
