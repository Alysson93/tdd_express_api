const express = require('express')
// const passport = require('passport')
const router = require('./routes')
// const authenticate = require('./config/passport')().authenticate

const app = express()
// app.use(passport.initialize())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use('/', /* authenticate(), */ router)

module.exports = app
