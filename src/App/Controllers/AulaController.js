/* eslint-disable camelcase */
import * as Yup from 'yup'
import Aula from '../models/Aula.js'

class AulaController {
  async store (request, response) {
    const schema = Yup.object().shape({
      module: Yup.string().required(),
      course: Yup.string().required(),
      lesson: Yup.string().required(),
      time: Yup.string().required(),
      status: Yup.boolean().required(),
      id_day: Yup.number().required()
    })

    try {
      await schema.validateSync(request.body, { abortEarly: false })
    } catch (err) {
      return response.status(400).json({ error: err.errors })
    }

    const { module, course, lesson, time, status, id_day } = request.body
    console.log(module, course, lesson, time, status, id_day)

    const aulaExists = await Aula.findOne({
      where: { module, course, lesson, time }
    })

    if (aulaExists) {
      return response.status(400).json({ error: 'Aula already exists' })
    }

    const aula = await Aula.create({
      module,
      course,
      lesson,
      time,
      status,
      id_day
    })

    return response.status(201).json(aula)
  }

  async index (_, response) {
    try {
      const aulas = await Aula.findAll()
      return response.json(aulas)
    } catch (error) {
      return response.status(500).json(error.message)
    }
  }

  async update (request, response) {
    try {
      const schema = Yup.object().shape({
        module: Yup.string(),
        course: Yup.string(),
        lesson: Yup.string(),
        time: Yup.string(),
        status: Yup.boolean(),
        id_day: Yup.number()
      })

      try {
        await schema.validateSync(request.body, { abortEarly: false })
      } catch (err) {
        return response.status(400).json({ error: err.errors })
      }

      const { id } = request.params

      const aula = await Aula.findByPk(id)
      if (!aula) {
        return response.status(404).json({ error: 'Aula not found' })
      }

      await aula.update(request.body)

      return response.status(200).json({ message: 'Aula was updated' })
    } catch (err) {
      // Trate o erro conforme necessário
      console.error(err)
      return response.status(500).json({ error: 'Internal server error' })
    }
  }

  async delete (request, response) {
    try {
      const { id } = request.params
      const aula = await Aula.findByPk(id)
      if (!aula) {
        return response.status(404).json({ error: 'Aula not found' })
      }

      await Aula.destroy({ where: { id } })

      return response.status(200).json({ message: 'Aula was deleted' })
    } catch (err) {
      console.error(err)
      return response.status(500).json({ error: 'Internal server error' })
    }
  }
}

export default new AulaController()
