import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import loginService from './services/login'
import blogService from './services/blogs'
import './App.css'
import axios from 'axios'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [loginErrorMessage, setLoginErrorMessage] = useState(null)
  const [user, setUser] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const [successMessage, setSuccessMessage] = useState(null)

  useEffect(() => {
    const fetchBlogs = async () => {
      const fetchedBlogs = await blogService.getAll()
      const sortedBlogs = fetchedBlogs.sort((a, b) => b.likes - a.likes)
      setBlogs(sortedBlogs)
    }
    fetchBlogs()
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username,
        password,
      })
      window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      if (axios.isAxiosError(exception)) {
        if (exception.response) {
          setLoginErrorMessage(exception.response.data.error)
          setTimeout(() => {
            setLoginErrorMessage(null)
          }, 5000)
        }
      }
      setLoginErrorMessage('Wrong credentials')
      setTimeout(() => {
        setLoginErrorMessage(null)
      }, 5000)
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedNoteappUser')
    window.localStorage.clear()
    setUser(null)
  }

  const addBlog = async (blogObject) => {
    try {
      const response = await blogService.create(blogObject)
      setBlogs([...blogs, response])
      setSuccessMessage(
        `a new blog ${response.title} by ${response.user.name} added`
      )
      setTimeout(() => {
        setSuccessMessage(null)
      }, 5000)
    } catch (exception) {
      if (axios.isAxiosError(exception)) {
        if (exception.response) {
          setErrorMessage(exception.response.data.error)
          setTimeout(() => {
            setErrorMessage(null)
          }, 5000)
        }
      }
    }
  }

  const handleAddBlogLike = async (blog) => {
    const addLike = {
      user: blog.user.id,
      likes: blog.likes + 1,
      author: blog.author,
      title: blog.title,
      url: blog.url,
    }
    const updatedBlog = await blogService.update(blog.id, addLike)
    const allBlogs = blogs.map((blog) =>
      blog.id !== updatedBlog.id ? blog : updatedBlog
    )
    const sortedBlogs = allBlogs.sort((a, b) => b.likes - a.likes)
    setBlogs(sortedBlogs)
  }

  return (
    <div>
      {user === null && (
        <LoginForm
          username={username}
          password={password}
          handleUsernameChange={({ target }) => setUsername(target.value)}
          handlePasswordChange={({ target }) => setPassword(target.value)}
          handleLogin={handleLogin}
          loginErrorMessage={loginErrorMessage}
        />
      )}
      {user !== null && (
        <div>
          <h2>blogs</h2>
          <div>
            {successMessage && (
              <Notification message={successMessage} typeOfMessage='success' />
            )}
            {errorMessage && (
              <Notification message={errorMessage} typeOfMessage='error' />
            )}
          </div>
          <div>
            {user.name} logged in{' '}
            <button id='logout-button' onClick={handleLogout}>
              logout
            </button>
          </div>
          <BlogForm createBlog={addBlog} />
          {blogs.map((blog) => {
            if (
              blog.user.username === user.username &&
              blog.user.name === user.name
            ) {
              blog.creator = true
            } else {
              blog.creator = false
            }
            return (
              <Blog
                key={blog.id}
                blogs={blogs}
                setBlogs={setBlogs}
                blog={blog}
                handleAddBlogLike={handleAddBlogLike}
              />
            )
          })}
        </div>
      )}
    </div>
  )
}

export default App
