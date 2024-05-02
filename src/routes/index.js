const router = require('express').Router()
const users = require('./users')
const accounts = require('./accounts')
// const auth = require('./auth')

router.get('/', (req, res) => {
  res.status(200).json({ msg: 'Hello, World!' })
})

router.use('/users', users)
router.use('/accounts', accounts)
// router.use('/auth', auth)

module.exports = router
