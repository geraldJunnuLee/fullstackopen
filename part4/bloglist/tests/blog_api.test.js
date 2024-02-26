const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')
const User = require('../models/user')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const api = supertest(app)

const initialBlogs = [
  {
    title: 'initial-blog-title-1',
    author: 'Batman',
    url: 'http://',
    likes: '2',
  },
  {
    title: 'initial-blog-title-2',
    author: 'Donald duck',
    url: 'http://',
    likes: '15',
  },
]

beforeEach(async () => {
  await User.deleteMany({})

  const passwordHash = await bcrypt.hash('sekret', 10)
  const user = new User({ username: 'root', name: 'name', passwordHash })

  await user.save()

  await Blog.deleteMany({})
  let blogObject = new Blog(initialBlogs[0])
  await blogObject.save()
  blogObject = new Blog(initialBlogs[1])
  await blogObject.save()
})

test('blogs are returned as json', async () => {
  const response = await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)

  expect(response.body).toHaveLength(2)
})

test('id is named id', async () => {
  const response = await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)

  const firstBlog = response.body[0]
  expect(firstBlog.id).toBeDefined()
})

test('http-post request to /api/blogs', async () => {
  const user = await User.findOne({ name: 'name' })

  const userForToken = {
    username: user.username,
    id: user.id,
  }
  const token = jwt.sign(userForToken, process.env.SECRET, {
    expiresIn: 60 * 60,
  })

  const newBlog = {
    title: 'from http-post-test',
    author: 'Scooby doo',
    url: 'http://',
    likes: '2',
    user: user.id,
  }

  await api
    .post('/api/blogs')
    .set('Authorization', `Bearer ${token}`)
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const afterPostApiCall = await Blog.find({})
  expect(afterPostApiCall).toHaveLength(initialBlogs.length + 1)
  const contents = afterPostApiCall.map((blog) => blog.title)
  expect(contents).toContain('from http-post-test')
})

test('test if likes property is defined', async () => {
  const user = await User.findOne({ name: 'name' })

  const userForToken = {
    username: user.username,
    id: user.id,
  }
  const token = jwt.sign(userForToken, process.env.SECRET, {
    expiresIn: 60 * 60,
  })

  const newBlog = {
    title: 'blog without likes',
    author: 'Winnie the pooh',
    url: 'http://',
  }
  const response = await api
    .post('/api/blogs')
    .set('Authorization', `Bearer ${token}`)
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  if (!newBlog.likes) {
    expect(response.body.likes).toEqual(0)
  } else {
    expect(response.body.likes).toEqual(newBlog.likes)
  }
})

test('test if title property is defined', async () => {
  const user = await User.findOne({ name: 'name' })

  const userForToken = {
    username: user.username,
    id: user.id,
  }
  const token = jwt.sign(userForToken, process.env.SECRET, {
    expiresIn: 60 * 60,
  })

  const newBlogWithoutTitle = {
    author: 'blog without title',
    url: 'http://',
    likes: 3,
  }

  const withoutTitleResponse = await api
    .post('/api/blogs')
    .set('Authorization', `Bearer ${token}`)
    .send(newBlogWithoutTitle)
    .expect(400)

  expect(withoutTitleResponse.body.error).toEqual(
    'Blog validation failed: title: Path `title` is required.'
  )
})

test('test if url property is defined', async () => {
  const user = await User.findOne({ name: 'name' })

  const userForToken = {
    username: user.username,
    id: user.id,
  }
  const token = jwt.sign(userForToken, process.env.SECRET, {
    expiresIn: 60 * 60,
  })

  const newBlogWithoutUrl = {
    title: 'Without url',
    author: 'blog without url',
    likes: 3,
  }
  const withoutUrlResponse = await api
    .post('/api/blogs')
    .set('Authorization', `Bearer ${token}`)
    .send(newBlogWithoutUrl)
    .expect(400)

  expect(withoutUrlResponse.body.error).toEqual(
    'Blog validation failed: url: Path `url` is required.'
  )
})

test('test to delete a blog', async () => {
  const blogsAtStart = await Blog.find({})

  const user = await User.findOne({ name: 'name' })

  const userForToken = {
    username: user.username,
    id: user.id,
  }
  const token = jwt.sign(userForToken, process.env.SECRET, {
    expiresIn: 60 * 60,
  })

  const newBlog = {
    title: 'from http-post-test',
    author: 'Scooby doo',
    url: 'http://',
    likes: '2',
    user: user.id,
  }

  await api
    .post('/api/blogs')
    .set('Authorization', `Bearer ${token}`)
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const blogs = await Blog.find({})
  const lastBlog = blogs[blogs.length - 1]

  await api
    .delete(`/api/blogs/${lastBlog.id}`)
    .set('Authorization', `Bearer ${token}`)
    .expect(204)
  const blogsAtEnd = await Blog.find({})

  expect(blogsAtEnd).toHaveLength(blogsAtStart.length)

  const titles = blogsAtEnd.map((b) => b.title)
  expect(titles).not.toContain(lastBlog.title)
})

test('test to update a blog', async () => {
  const blogsAtStart = await Blog.find({})
  const blogToUpdate = blogsAtStart[0]

  const updatedBlog = {
    title: 'Here is an updated title',
    author: blogToUpdate.author,
    url: blogToUpdate.url,
    likes: 1000,
  }

  const response = await api
    .put(`/api/blogs/${blogToUpdate.id}`)
    .send(updatedBlog)
    .expect(200)

  const blogsAtEnd = await Blog.find({})
  expect(blogToUpdate.title).not.toEqual(response.body)
  expect(blogsAtEnd[0].title).toEqual(response.body.title)
})

afterAll(async () => {
  await mongoose.connection.close()
})
