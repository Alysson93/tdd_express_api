const db = require('../db/connection')

module.exports = {
  create: async (data) => {
    if (!data.name) return { error: 'Nome é um atributo obrigatório.' }
    const accounts = await db('accounts').insert(data, '*')
    return accounts[0]
  },
  read: async () => {
    return await db('accounts').select()
  },
  readById: async (id) => {
    return await db('accounts').where({ id }).first()
  },
  update: async (id, data) => {
    if (!data.name) return false
    await db('accounts').where({ id }).update(data)
    return true
  },
  delete: async (id) => {
    await db('accounts').where({ id }).del()
  }
}
