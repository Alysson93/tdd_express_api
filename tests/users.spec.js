const request = require('supertest')
const app = require('../src/app')
const userService = require('../src/services/userService')

const email = Date.now() + '@test.com'

test('Deve listar todos os usuários', async () => {
  const res = await request(app).get('/users')
  expect(res.status).toBe(200)
})

test('Deve criar um usuário', async () => {
  const res = await request(app).post('/users').send({
    email, password: '123', name: 'John Doe'
  })
  expect(res.status).toBe(201)
  expect(res.body.name).toBe('John Doe')
  expect(res.body).not.toHaveProperty('password')
})

test('Deve armanzenar uma senha criptografada', async () => {
  const res = await request(app).post('/users').send({
    email: Date.now() + '@crypt.com', password: '123', name: 'John Doe'
  })
  expect(res.status).toBe(201)
  const { id } = res.body
  const userDb = await userService.readById(id)
  expect(userDb.password).not.toBeUndefined()
  expect(userDb.password).not.toBe('123')
})

test('Não deve criar um usuário sem email', async () => {
  const res = await request(app).post('/users').send({
    password: '123', name: 'John Doe'
  })
  expect(res.status).toBe(400)
  expect(res.body.error).toBe('E-mail é um atributo obrigatório.')
})

test('Não deve criar um usuário sem senha', async () => {
  const res = await request(app).post('/users').send({
    email, name: 'John Doe'
  })
  expect(res.status).toBe(400)
  expect(res.body.error).toBe('Senha é um atributo obrigatório.')
})

test('Não deve criar um usuário sem nome', async () => {
  const res = await request(app).post('/users').send({
    email, password: '123'
  })
  expect(res.status).toBe(400)
  expect(res.body.error).toBe('Nome é um atributo obrigatório.')
})

test('Não deve inserir usuário com o mesmo e-mail', async () => {
  const res = await request(app).post('/users').send({
    email, password: '123', name: 'John Doe'
  })
  expect(res.status).toBe(400)
  expect(res.body.error).toBe('Já existe um usuário com estas credenciais.')
})
