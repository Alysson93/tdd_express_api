const router = require('express').Router()
const service = require('../services/accountService')

router.get('/', async (req, res) => {
  const accounts = await service.read()
  res.status(200).json(accounts)
})

router.get('/:id', async (req, res) => {
  const account = await service.readById(req.params.id)
  if (account == null) res.status(404).json({ msg: 'Conta não encontrada.' })
  else res.status(200).json(account)
})

router.post('/', async (req, res) => {
  const account = await service.create(req.body)
  const status = account.error ? 400 : 201
  res.status(status).json(account)
})

router.put('/:id', async (req, res) => {
  const account = await service.readById(req.params.id)
  if (account == null) res.status(404).json({ msg: 'Conta não encontrada.' })
  else {
    const result = await service.update(req.params.id, req.body)
    if (result) res.status(204).send()
    else res.status(400).json('Davos enviados incorretamente.')
  }
})

router.delete('/:id', async (req, res) => {
  const account = await service.readById(req.params.id)
  if (account == null) res.status(404).json({ msg: 'Conta não encontrada.' })
  else {
    await service.delete(req.params.id)
    res.status(204).send()
  }
})

module.exports = router
