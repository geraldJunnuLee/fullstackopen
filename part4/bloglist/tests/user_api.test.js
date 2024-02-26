const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const User = require('../models/user')

const api = supertest(app)

const initialUsers = [
  {
    username: 'j-Lee',
    name: 'hello',
    passwordHash: 'hello-world',
  },
  {
    username: 'foo-bar-user',
    name: 'world',
    passwordHash: 'foo-bar-password',
  },
]

beforeEach(async () => {
  await User.deleteMany({})
  let userObject = new User(initialUsers[0])
  await userObject.save()
  userObject = new User(initialUsers[1])
  await userObject.save()
})

test('user with a duplicate name', async () => {
  const usersAtStart = await User.find({})

  const duplicateUsername = {
    username: 'j-Lee',
    name: 'Junnu',
    password: 'hello-world',
  }

  const response = await api
    .post('/api/users/')
    .send(duplicateUsername)
    .expect(400)

  expect(response.body.error).toEqual('Username must be unique')
  const usersAfterApiCall = await User.find({})
  expect(usersAtStart.length).toEqual(usersAfterApiCall.length)
})

test('user with a invalid username', async () => {
  const usersAtStart = await User.find({})

  const invalidUsername = {
    username: 'je',
    name: 'Harri',
    password: 'hello-world',
  }

  const response = await api
    .post('/api/users/')
    .send(invalidUsername)
    .expect(400)

  expect(response.body.error).toContain(
    'username: Username must be at least 3 characters long'
  )
  const usersAfterApiCall = await User.find({})
  expect(usersAtStart.length).toEqual(usersAfterApiCall.length)
})

test('user with invalid password', async () => {
  const usersAtStart = await User.find({})

  const invalidPassword = {
    username: 'foo-bar',
    name: 'Harri',
    password: 'he',
  }

  const response = await api
    .post('/api/users/')
    .send(invalidPassword)
    .expect(400)

  expect(response.body.error).toEqual(
    'Password must be at least 3 characters long'
  )
  const usersAfterApiCall = await User.find({})
  expect(usersAtStart.length).toEqual(usersAfterApiCall.length)
})

afterAll(async () => {
  await mongoose.connection.close()
})
