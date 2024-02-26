const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.get('/', async (request, response) => {
  const users = await User.find(
    {},
    { username: 1, name: 1, blogs: 1 }
  ).populate('blogs')
  response.json(users)
})

usersRouter.get('/:id', async (request, response) => {
  const fetchedUser = await User.findById(request.params.id).populate('blogs')
  if (fetchedUser) {
    response.json(fetchedUser)
  } else {
    response.status(400).end()
  }
})

usersRouter.post('/', async (request, response) => {
  const { username, name, password } = request.body

  if (!password) {
    return response.status(400).json({
      error: 'No password entered',
    })
  }
  if (password.length < 3) {
    return response.status(400).json({
      error: 'Password must be at least 3 characters long',
    })
  }
  const saltRounds = 10
  const passwordHash = await bcrypt.hash(password, saltRounds)

  const user = new User({
    username,
    name,
    passwordHash,
  })

  const savedUser = await user.save()

  response.status(201).json(savedUser)
})

module.exports = usersRouter
