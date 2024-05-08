import * as Yup from 'yup'
import Course from '../models/Course.js'
import User from '../models/User.js'

// validação dos dados que vão chegar
class CourseController {
  async store (request, response) {
    const schema = Yup.object().shape({ // formato do objeto abaixo:
      course: Yup.string().required()
    })

    // caso ele não atenda ao formato exigido acima ele vai dar erro conforme no UserControllers, dizendo o que está de errado
    try {
      await schema.validateSync(request.body, { abortEarly: false })
    } catch (err) {
      return response.status(400).json({ error: err.errors })
    }
    // verficando se a pessoa que está logado é o admin:
    const { admin: isAdmin } = await User.findByPk(request.userId)
    if (!isAdmin) {
      return response.status(401).json()
    }

    // arquivos validados, vamos pegalos:
    const { course } = request.body

    const courseExists = await Course.findOne({ // procurar se o dia da semana que tá ali já existe, para não cadastrar repetido
      where: { course } // se ele não acha ele retorna com null e daí cai no if.
    })
    console.log(Course)
    if (courseExists) {
      return response.status(400).json({ error: 'Course already exists' }) // erro avisando que já existe
    }

    const { id } = await Course.create({ course })

    return response.status(201).json({ id, course })
  }

  async index (request, response) {
    try {
      const lesson = await Course.findAll() // procure todos dentro dessa variavel
      return response.json(lesson) // retorna todos
    } catch (error) {
      return response.status(500).json({ error: 'Internal server error' })
    }
  }

  async update (request, response) {
    try {
      const schema = Yup.object().shape({ // formato do objeto abaixo:
        course: Yup.string()
      })

      // caso ele não atenda ao formato exigido acima ele vai dar erro conforme no UserControllers, dizendo o que está de errado
      try {
        await schema.validateSync(request.body, { abortEarly: false })
      } catch (err) {
        return response.status(400).json({ error: err.errors })
      }
      // verficando se a pessoa que está logado é o admin:
      const { admin: isAdmin } = await User.findByPk(request.userId) // Ele vai pegar as informações de userid dentro do token e vai pegar a informação admin que tem dentre as informações do usuário (true ou false)
      if (!isAdmin) {
        return response.status(401).json()
      }

      const { course } = request.body
      const { id } = request.params

      // vamos verificar se o ID está correto antes da alteração:
      const lesson = await Course.findByPk(id)
      if (!lesson) {
        return response.status(401).json({ error: 'Make sure your Course ID is correct' })
      }

      await Course.update({ course }, { where: { id } })

      return response.status(200).json()
    } catch (err) {

    }
  }
}

export default new CourseController()
