const passport = require('passport')
const passportJwt = require('passport-jwt')
const userService = require('../services/userService')

const secret = 'segredo'

const { Strategy, ExtractJwt } = passportJwt

module.exports = () => {
  const params = {
    secretOrKey: secret,
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
  }
  const strategy = new Strategy(params, async (payload, done) => {
    try {
      const user = await userService.readOne({ id: payload.id })
      if (user) {
        done(null, { ...payload })
      } else {
        done(null, false)
      }
    } catch (error) {
      done(error, false)
    }
  })
  passport.use(strategy)
  return { authenticate: () => passport.authenticate('jwt', { session: false }) }
}
