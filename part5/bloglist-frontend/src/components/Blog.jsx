import { useState } from 'react'
import blogService from '../services/blogs'
import Button from './Button'

const Blog = ({ blogs, setBlogs, blog, handleAddBlogLike }) => {
  const [showAllDetails, setShowAllDetails] = useState(false)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }

  const handleShowAllDetails = () => {
    setShowAllDetails(!showAllDetails)
  }

  const handleRemoveBlog = async (event) => {
    event.preventDefault()
    if (window.confirm(`Remove ${blog.name} by ${blog.author}`)) {
      await blogService.deleteBlog(blog.id)
      setBlogs(blogs.filter((blogObject) => blogObject.id !== blog.id))
    }
  }

  return (
    <div className='blog' style={blogStyle}>
      {blog.title} {blog.author}
      <button
        className='show-blog-details-button'
        data-testid='show-blog-details-button'
        onClick={handleShowAllDetails}
      >
        {showAllDetails ? 'hide' : 'view'}
      </button>
      {showAllDetails && (
        <div>
          <div data-testid='blog-url'>{blog.url}</div>
          <div data-testid='blog-likes'>
            likes {blog.likes}
            <Button addLike={() => handleAddBlogLike(blog)} />
          </div>
          <div>{blog.user.name}</div>
          {blog.creator && (
            <div>
              <button className='delete-blog-button' onClick={handleRemoveBlog}>
                remove
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default Blog
