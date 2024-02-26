import { createSlice } from '@reduxjs/toolkit'
import loginService from '../services/login'
import blogService from '../services/blogs'
import { setNotification } from './notificationReducer'

const initialState = null

const loginReducer = createSlice({
  name: 'login',
  initialState,
  reducers: {
    setLoggedInUser(state, action) {
      state = action.payload
      return state
    },
    logoutUser(state) {
      state = null
      return state
    },
  },
})

export const { setLoggedInUser, logoutUser } = loginReducer.actions

export default loginReducer.reducer

export const loginUser = (credentials) => {
  return async (dispatch) => {
    try {
      const user = await loginService.login(credentials)
      window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(user))
      blogService.setToken(user.token)
      dispatch(setLoggedInUser(user))
    } catch (exception) {
      dispatch(setNotification(exception.response.data.error, 'error'))
    }
  }
}
