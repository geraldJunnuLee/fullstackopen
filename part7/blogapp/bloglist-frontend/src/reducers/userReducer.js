import { createSlice } from '@reduxjs/toolkit'
import userService from '../services/users'

const initialState = {
  users: [],
  user: null,
}

const userReducer = createSlice({
  name: 'user',
  initialState,
  reducers: {
    getUsers(state, action) {
      state.users = action.payload
      return state
    },
    getUser(state, action) {
      state.user = action.payload
      return state
    },
  },
})

export const { getUsers, getUser } = userReducer.actions

export default userReducer.reducer

export const fetchUsers = () => {
  return async (dispatch) => {
    const users = await userService.getAll()
    dispatch(getUsers(users))
  }
}

export const fetchUserDetails = (id) => {
  return async (dispatch) => {
    const user = await userService.getUserById(id)
    dispatch(getUser(user))
  }
}
