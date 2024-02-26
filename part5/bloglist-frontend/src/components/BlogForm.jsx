import React, { useState } from 'react'

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
    <div>
      <div>
        <h2>create new</h2>
        <div style={hideWhenVisible}>
          <button
            id='show-blog-form-button'
            data-testid='show-blog-form-button'
            onClick={() => setShowBlogForm(true)}
          >
            create new blog
          </button>
        </div>
        <div style={showWhenVisible}>
          <form onSubmit={addBlog}>
            <div>
              title:
              <input
                id='blog-form-title-input'
                data-testid='blog-form-title-input'
                type='text'
                value={title}
                onChange={({ target }) => setTitle(target.value)}
              />
            </div>
            <div>
              author:
              <input
                id='blog-form-author-input'
                data-testid='blog-form-author-input'
                type='text'
                value={author}
                onChange={({ target }) => setAuthor(target.value)}
              />
            </div>
            <div>
              url:
              <input
                id='blog-form-url-input'
                data-testid='blog-form-url-input'
                type='text'
                value={url}
                onChange={({ target }) => setUrl(target.value)}
              />
            </div>
            <div>
              <button
                id='create-new-blog-button'
                data-testid='create-new-blog-button'
                type='submit'
              >
                create
              </button>
            </div>
          </form>
          <div>
            <button onClick={handleCancelNewBlog}>cancel</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BlogForm
