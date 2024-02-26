import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'

import { AppBar, Box, Button, Toolbar, Typography } from '@mui/material'

import blogService from './services/blogs'
import './App.css'
import LoginForm from './components/LoginForm'
import { useDispatch, useSelector } from 'react-redux'
import { initializeBlogs } from './reducers/blogReducer'
import BlogList from './components/BlogList'
import { loginUser, logoutUser, setLoggedInUser } from './reducers/loginReducer'
import Users from './components/Users'
import User from './components/User'
import Blog from './components/Blog'

const App = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const dispatch = useDispatch()
  const loggedInUser = useSelector((state) => state.login)
  const notification = useSelector((state) => state.notification)

  useEffect(() => {
    if (!loggedInUser) return
    dispatch(initializeBlogs())
  }, [loggedInUser])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      dispatch(setLoggedInUser(user))
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    dispatch(loginUser({ username, password }))
    setUsername('')
    setPassword('')
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedNoteappUser')
    window.localStorage.clear()
    dispatch(logoutUser())
  }

  return (
    <Router>
      <Box>
        {!loggedInUser && (
          <LoginForm
            username={username}
            password={password}
            handleUsernameChange={({ target }) => setUsername(target.value)}
            handlePasswordChange={({ target }) => setPassword(target.value)}
            handleLogin={handleLogin}
            loginErrorNotification={notification}
          />
        )}
        {loggedInUser && (
          <Box>
            <AppBar
              position="static"
              style={{ backgroundColor: 'lightblue', marginBottom: '30px' }}
            >
              <Toolbar>
                <Button color="inherit" component={Link} to="/">
                  blogs
                </Button>
                <Button color="inherit" component={Link} to="/users">
                  users
                </Button>
                <Typography style={{ color: 'black' }}>
                  {loggedInUser.name} logged in
                </Typography>
                <Button
                  style={{ margin: '10px' }}
                  size="small"
                  variant="contained"
                  id="logout-button"
                  onClick={handleLogout}
                >
                  logout
                </Button>
              </Toolbar>
            </AppBar>
            <Typography style={{ marginBottom: '10px' }} variant="h4">
              blog app
            </Typography>
            <Routes>
              <Route path="/users/:id" element={<User />} />
              <Route path="/users" element={<Users />} />
              <Route path="/blogs/:id" element={<Blog />} />
              <Route path="/" element={<BlogList user={loggedInUser} />} />
            </Routes>
          </Box>
        )}
      </Box>
    </Router>
  )
}

export default App
