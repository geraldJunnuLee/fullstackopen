const middleware = require('../utils/middleware')
const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
  response.json(blogs)
})

blogsRouter.get('/:id', async (request, response) => {
  const fetchBlog = await Blog.findById(request.params.id).populate('user', {
    name: 1,
  })
  if (fetchBlog) {
    response.json(fetchBlog)
  } else {
    response.status(404).end()
  }
})

blogsRouter.post('/', middleware.userExtractor, async (request, response) => {
  const body = request.body
  const user = request.user

  const foundUser = await User.findById(user.id)

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes || 0,
    comments: body.comments || [],
    user: user.id,
  })
  const savedBlog = await blog.save()
  foundUser.blogs = foundUser.blogs.concat(savedBlog.id)
  await foundUser.save()
  const blogPopulateUserField = await Blog.findById(savedBlog.id).populate(
    'user',
    {
      username: 1,
      name: 1,
    }
  )
  response.status(201).json(blogPopulateUserField)
})

blogsRouter.delete(
  '/:id',
  middleware.userExtractor,
  async (request, response) => {
    const user = request.user
    const userId = user.id
    const blog = await Blog.findById(request.params.id)
    if (userId.toString() !== blog.user.toString()) {
      response.status(400).end()
    } else {
      await Blog.findByIdAndDelete(request.params.id)
      response.status(204).end()
    }
  }
)

blogsRouter.put('/:id', async (request, response) => {
  const body = request.body

  const blog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    user: body.user,
  }

  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, {
    new: true,
  })
  const blogPopulateUserField = await Blog.findById(updatedBlog.id).populate(
    'user',
    {
      username: 1,
      name: 1,
    }
  )
  response.json(blogPopulateUserField)
})

blogsRouter.put('/:id/comments', async (request, response) => {
  const body = request.body

  const blog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    user: body.user,
    comments: body.comments,
  }

  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, {
    new: true,
  })
  response.json(updatedBlog)
})

module.exports = blogsRouter
