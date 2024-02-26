import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { fetchBlogDetails } from '../reducers/blogReducer'

import {
  handleAddBlogLike,
  handleAddBlogComment,
} from '../reducers/blogReducer'

import { Box, Button, Link, TextField, Typography } from '@mui/material'

const Blog = () => {
  const [commentText, setCommentText] = useState('')
  const dispatch = useDispatch()
  const { id } = useParams()
  const blog = useSelector((state) => state.blog.blog)

  useEffect(() => {
    dispatch(fetchBlogDetails(id))
  }, [])

  const handleBlogLike = async (blog) => {
    const blogAddLike = {
      user: blog.user.id,
      likes: blog.likes + 1,
      author: blog.author,
      title: blog.title,
      url: blog.url,
    }
    dispatch(handleAddBlogLike(id, blogAddLike))
  }

  const handleBlogComment = (blog) => {
    const blogAddComment = {
      user: blog.user.id,
      likes: blog.likes + 1,
      author: blog.author,
      title: blog.title,
      url: blog.url,
      comments: [...blog.comments, commentText],
    }
    dispatch(handleAddBlogComment(id, blogAddComment))
    setCommentText('')
  }

  return (
    <Box>
      {blog && (
        <Box>
          <Typography
            style={{ marginBottom: '10px' }}
            variant="h5"
          >{`${blog.title} ${blog.author}`}</Typography>
          <Link href={blog.url}>{blog.url}</Link>
          <Box style={{ display: 'flex', alignItems: 'center' }}>
            <Typography style={{ marginRight: '10px' }}>
              {blog.likes} likes
            </Typography>
            <Button
              variant="contained"
              size="small"
              onClick={() => handleBlogLike(blog)}
            >
              like
            </Button>
          </Box>
          <Box style={{ marginBottom: '10px' }}>added by {blog.user.name}</Box>
          <Typography style={{ marginBottom: '10px' }} variant="h6">
            comments
          </Typography>
          <Box>
            <TextField
              size="small"
              type="text"
              style={{ marginRight: '10px' }}
              value={commentText}
              onChange={({ target }) => setCommentText(target.value)}
            />
            <Button
              variant="contained"
              size="medium"
              onClick={() => handleBlogComment(blog)}
            >
              add comment
            </Button>
          </Box>
          <ul>
            {blog.comments.map((comment, i) => (
              <li key={i}>{comment}</li>
            ))}
          </ul>
        </Box>
      )}
    </Box>
  )
}

export default Blog
