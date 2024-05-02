const router = require('express').Router()
const service = require('../services/userService')

router.get('/', async (req, res) => {
  const users = await service.read()
  res.status(200).json(users)
})

router.post('/', async (req, res) => {
  const user = await service.create(req.body)
  const status = user.error ? 400 : 201
  res.status(status).json(user)
})

module.exports = router
