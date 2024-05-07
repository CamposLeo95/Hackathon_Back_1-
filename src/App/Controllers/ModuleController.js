/* eslint-disable camelcase */

import * as Yup from 'yup'
import Course from '../models/Course.js'
import Module from '../models/Module.js'
import User from '../models/User.js'

// validação dos dados que vão chegar
class ModuleController {
  async store (request, response) {
    const schema = Yup.object().shape({ // formato do objeto abaixo:
      module: Yup.string().required(),
      course_id: Yup.number()
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

    // arquivos validados, vamos pegalos:
    const { module, course_id } = request.body

    const moduleExists = await Module.findOne({ // procurar se o dia da semana que tá ali já existe, para não cadastrar repetido
      where: { module } // se ele não acha ele retorna com null e daí cai no if.
    })
    console.log(Module)
    if (moduleExists) {
      return response.status(400).json({ error: 'Module already exists' }) // erro avisando que já existe
    }

    const newModule = await Module.create({ module, course_id })

    return response.status(201).json(newModule)
  }

  async index (request, response) {
    try {
      const classDev = await Module.findAll({ // procure todos os modulos dentro dessa variavel //após criar o relacionamento, dentro dos parênteses vamos adicionar:
        include: [ // vamos incluir os itens abaixo:
          {
            model: Course,
            as: 'course',
            attributes: ['id', 'course'] // e vamos pegar os itens id e nome apenas
          }
        ]
      })

      console.log(classDev)

      return response.json(classDev) // retorna todos as aulas
    } catch (err) {
      return response.status(400).json({ error: err.errors })
    }
  }

  async update (request, response) {
    try {
      const schema = Yup.object().shape({ // formato do objeto abaixo:
        module: Yup.string(),
        course_id: Yup.number()
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

      const { module, course_id } = request.body
      const { id } = request.params

      // vamos verificar se o ID está correto antes da alteração:
      const lesson = await Module.findByPk(id)
      if (!lesson) {
        return response.status(401).json({ error: 'Make sure your Module ID is correct' })
      }

      await Module.update({ module, course_id }, { where: { id } })

      return response.status(200).json()
    } catch (err) {

    }
  }
}

export default new ModuleController()
