const bcrypt = require('bcrypt')
const db = require('../db/connection')

module.exports = {

  create: async (data) => {
    if (!data.email) return { error: 'E-mail é um atributo obrigatório.' }
    if (!data.password) return { error: 'Senha é um atributo obrigatório.' }
    if (!data.name) return { error: 'Nome é um atributo obrigatório.' }
    const user = await db('users').where({ email: data.email }).select()
    if (user.length > 0) return { error: 'Já existe um usuário com estas credenciais.' }
    const getPassHash = (pass) => {
      const salt = bcrypt.genSaltSync(10)
      return bcrypt.hashSync(pass, salt)
    }
    data.password = getPassHash(data.password)
    const users = await db('users').insert(data, ['id', 'name', 'email'])
    return users[0]
  },

  read: async (filter = {}) => {
    return await db('users').where(filter).select(['id', 'name', 'email'])
  },

  readById: async (id) => {
    return await db('users').where({ id }).first()
  },

  readOne: async (filter = {}) => {
    return await db('users').where(filter).first()
  }

}
