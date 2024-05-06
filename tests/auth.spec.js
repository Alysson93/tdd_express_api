const request = require('supertest')
const app = require('../src/app')
const userService = require('../src/services/userService')

// test('Deve criar um usuário via signup', async () => {
//   const res = await request(app).post('/auth/signup').send({
//     email: 'john@log.com', password: '123'
//   })
//   expect(res.status).toBe(201)
//   expect(res.body.name).toBe('John Log')
//   expect(res.body).toHaveProperty('email')
//   expect(res.body).not.toHaveProperty('password')
// })

test('Deve receber token ao logar', async () => {
  const email = Date.now() + '@auth.com'
  await userService.create({ email, password: '123', name: 'Walter Mitty' })
  const res = await request(app).post('/auth/signin').send({ email, password: '123' })
  expect(res.status).toBe(200)
  expect(res.body).toHaveProperty('token')
})

test('Não deve autenticar usuário com senha errada.', async () => {
  const email = Date.now() + '@auth.com'
  await userService.create({ email, password: '123', name: 'Walter Mitty' })
  const res = await request(app).post('/auth/signin').send({ email, password: '12' })
  expect(res.status).toBe(400)
  expect(res.body.error).toBe('Usuário e / ou senha incorretos.')
})

// test('Não deve autenticar usuário inexistente.', async () => {
//   const res = await request(app).post('/auth/signin').send({ email: 'dont@dont.com', password: '123' })
//   expect(res.status).toBe(400)
//   expect(res.body.error).toBe('Usuário e / ou senha incorretos.')
// })

// test('Não deve acessar uma rota protegida sem token', async () => {
//   const res = await request(app).get('/users')
//   expect(res.status).toBe(401)
// })
