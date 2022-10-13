const testingRouter = require('express').Router()
const User = require('../models/User')
const Note = require('../models/Note')

testingRouter.get('/reset', async (req, res) => {
  await User.deleteMany({})
  await Note.deleteMany({})
  res.status(204).end()
})
module.exports = { testingRouter }
