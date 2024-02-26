import React, { useState } from 'react'

import { Box, Typography, Button, TextField } from '@mui/material'

const BlogForm = ({ createBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const [showBlogForm, setShowBlogForm] = useState(false)

  const hideWhenVisible = { display: showBlogForm ? 'none' : '' }
  const showWhenVisible = { display: showBlogForm ? '' : 'none' }

  const addBlog = (event) => {
    event.preventDefault()
    createBlog({
      title,
      author,
      url,
    })
    setTitle('')
    setAuthor('')
    setUrl('')
  }

  const handleCancelNewBlog = (event) => {
    event.preventDefault()
    setTitle('')
    setAuthor('')
    setUrl('')
    setShowBlogForm(false)
  }

  return (
    <Box>
      <Box>
        <Box style={hideWhenVisible}>
          <Button
            variant="contained"
            style={{ marginBottom: '10px' }}
            id="show-blog-form-button"
            data-testid="show-blog-form-button"
            onClick={() => setShowBlogForm(true)}
          >
            create new blog
          </Button>
        </Box>
        <Box style={showWhenVisible}>
          <form onSubmit={addBlog}>
            <Box style={{ display: 'flex', marginBottom: '10px' }}>
              <Typography style={{ width: '70px' }}>title:</Typography>
              <TextField
                size="small"
                id="blog-form-title-input"
                data-testid="blog-form-title-input"
                type="text"
                value={title}
                onChange={({ target }) => setTitle(target.value)}
              />
            </Box>
            <Box style={{ display: 'flex', marginBottom: '10px' }}>
              <Typography style={{ width: '70px' }}>author:</Typography>
              <TextField
                size="small"
                id="blog-form-author-input"
                data-testid="blog-form-author-input"
                type="text"
                value={author}
                onChange={({ target }) => setAuthor(target.value)}
              />
            </Box>
            <Box style={{ display: 'flex', marginBottom: '10px' }}>
              <Typography style={{ width: '70px' }}>url:</Typography>
              <TextField
                size="small"
                id="blog-form-url-input"
                data-testid="blog-form-url-input"
                type="text"
                value={url}
                onChange={({ target }) => setUrl(target.value)}
              />
            </Box>
            <Box>
              <Button
                style={{ marginBottom: '10px' }}
                variant="contained"
                id="create-new-blog-button"
                data-testid="create-new-blog-button"
                type="submit"
              >
                create
              </Button>
            </Box>
          </form>
          <Box>
            <Button
              style={{ marginBottom: '10px' }}
              variant="contained"
              onClick={handleCancelNewBlog}
            >
              cancel
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  )
}

export default BlogForm
