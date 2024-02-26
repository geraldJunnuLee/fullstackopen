import { createSlice, current } from '@reduxjs/toolkit'
import blogService from '../services/blogs'
import { setNotification } from './notificationReducer'

const initialState = {
  blogs: [],
  blog: null,
}

const blogReducer = createSlice({
  name: 'blog',
  initialState,
  reducers: {
    setBlogs(state, action) {
      const blogs = action.payload
      const sortedBlogs = blogs.sort((a, b) => b.likes - a.likes)
      state.blogs = sortedBlogs
      return state
    },
    getBlogById(state, action) {
      state.blog = action.payload
      return state
    },
    addBlog(state, action) {
      state.blogs = [...state.blogs, action.payload]
      return state
    },
    addLike(state, action) {
      const updatedBlog = action.payload
      const updatedBlogList = state.blogs.map((blog) =>
        blog.id !== updatedBlog.id ? blog : updatedBlog,
      )
      const sortedBlogs = updatedBlogList.sort((a, b) => b.likes - a.likes)
      state.blog = updatedBlog
      state.blogs = sortedBlogs
      return state
    },
    addComment(state, action) {
      const updatedBlog = action.payload
      const updatedBlogList = state.blogs.map((blog) =>
        blog.id !== updatedBlog.id ? blog : updatedBlog,
      )
      state.blog = updatedBlog
      state.blogs = updatedBlogList
      return state
    },
    deleteBlog(state, action) {
      const deletedBlogId = action.payload
      const currentState = current(state)
      const updatedBlogs = currentState.filter(
        (blog) => blog.id !== deletedBlogId,
      )
      state.blogs = updatedBlogs
      return state
    },
    resetBlog(state, action) {
      state.blog = null
      return state
    },
  },
})

export const {
  setBlogs,
  addBlog,
  addLike,
  addComment,
  deleteBlog,
  getBlogById,
  resetBlog,
} = blogReducer.actions

export default blogReducer.reducer

export const initializeBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll()
    dispatch(setBlogs(blogs))
  }
}

export const handleAddBlog = (blogObject) => {
  return async (dispatch) => {
    try {
      const response = await blogService.create(blogObject)
      dispatch(addBlog(response))
      dispatch(
        setNotification(
          `a new blog ${response.title} by ${response.user.name} added`,
          'success',
        ),
      )
    } catch (exception) {
      dispatch(setNotification(exception.response.data.error, 'error'))
    }
  }
}

export const fetchBlogDetails = (id) => {
  return async (dispatch) => {
    const blog = await blogService.getOne(id)
    dispatch(getBlogById(blog))
  }
}

export const handleAddBlogLike = (id, blogObject) => {
  return async (dispatch) => {
    try {
      const blog = await blogService.update(id, blogObject)
      dispatch(addLike(blog))
    } catch (exception) {
      dispatch(setNotification(exception.response.data.error, 'error'))
    }
  }
}

export const handleAddBlogComment = (id, blogObject) => {
  return async (dispatch) => {
    try {
      const blog = await blogService.updateComments(id, blogObject)
      dispatch(addComment(blog))
    } catch (exception) {
      dispatch(setNotification(exception.response.data.error, 'error'))
    }
  }
}

export const handleDeleteBlog = (blogId) => {
  return async (dispatch) => {
    try {
      await blogService.deleteBlog(blogId)
      dispatch(deleteBlog(blogId))
    } catch (exception) {
      dispatch(setNotification(exception.response.data.error, 'error'))
    }
  }
}
