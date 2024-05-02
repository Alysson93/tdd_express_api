// const router = require('express').Router()
// const jwt = require('jwt-simple')
// const bcrypt = require('bcrypt')
// const userService = require('../services/userService')
// const secret = 'segredo'

// router.post('/signin', async (req, res, next) => {
//   const user = await userService.readOne({ email: req.body.email })
//   if (!user) res.status(400).json({ error: 'Usuário e / ou senha incorretos.' })
//   else if (bcrypt.compareSync(req.body.password, user.password)) {
//     const payload = {
//       id: user.id,
//       name: user.name,
//       email: user.email
//     }
//     const token = jwt.encode(payload, secret)
//     res.status(200).json({ token })
//   } else res.status(400).json({ error: 'Usuário e / ou senha incorretos.' })
// })

// router.post('/signup', async (req, res) => {

// })

// module.exports = router
