const request = require('supertest')
const app = require('../src/app')
const userService = require('../src/services/userService')
const accountService = require('../src/services/accountService')

let user

beforeAll(async () => {
  user = await userService.create({
    email: Date.now() + '@test.com',
    password: '123',
    name: 'Jane Doe'
  })
})

test('Deve listar todas as contas', async () => {
  const res = await request(app).get('/accounts')
  expect(res.status).toBe(200)
})

test('Deve retornar uma conta por id', async () => {
  const account = await accountService.create({ name: 'Acc created', user_id: user.id })
  const res = await request(app).get(`/accounts/${account.id}`)
  expect(res.status).toBe(200)
  expect(res.body.name).toBe('Acc created')
})

test('Deve inserir uma conta com sucesso', async () => {
  const res = await request(app).post('/accounts').send(
    { name: 'Acc', user_id: user.id }
  )
  expect(res.status).toBe(201)
  expect(res.body.name).toBe('Acc')
})

test('Não deve inserir uma conta sem nome', async () => {
  const res = await request(app).post('/accounts').send(
    { user_id: user.id }
  )
  expect(res.status).toBe(400)
  expect(res.body.error).toBe('Nome é um atributo obrigatório.')
})

test('Deve alterar uma conta', async () => {
  const account = await accountService.create({ name: 'Acc to update', user_id: user.id })
  const res = await request(app).put(`/accounts/${account.id}`).send({ name: 'Acc updated' })
  expect(res.status).toBe(204)
})

test('Deve remover uma conta', async () => {
  const account = await accountService.create({ name: 'Acc to delete', user_id: user.id })
  const res = await request(app).delete(`/accounts/${account.id}`)
  expect(res.status).toBe(204)
})
