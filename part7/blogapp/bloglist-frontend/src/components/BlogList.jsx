import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import BlogForm from './BlogForm'
import { handleAddBlog, resetBlog } from '../reducers/blogReducer'

import { Box, Button } from '@mui/material'

const BlogList = () => {
  const blogs = useSelector((state) => state.blog.blogs)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(resetBlog())
  }, [])

  const addBlog = async (blogObject) => {
    dispatch(handleAddBlog(blogObject))
  }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }

  return (
    <Box>
      <BlogForm createBlog={addBlog} />
      {blogs.map((blog) => (
        <Box key={blog.id} style={blogStyle}>
          <Button component={Link} to={`/blogs/${blog.id}`}>
            {blog.title}
          </Button>
        </Box>
      ))}
    </Box>
  )
}

export default BlogList
