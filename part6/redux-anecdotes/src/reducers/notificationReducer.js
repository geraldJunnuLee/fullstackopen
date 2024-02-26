import { createSlice } from '@reduxjs/toolkit'

const initialState = null

const notificationReducer = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    displayNotification(state, action) {
      state = action.payload
      return state
    },
    removeNotification(state) {
      state = null
      return state
    },
  },
})

export const { displayNotification, removeNotification } =
  notificationReducer.actions

export default notificationReducer.reducer

export const setNotification = (anecdoteText, duration) => {
  return async (dispatch) => {
    dispatch(displayNotification(anecdoteText))
    setTimeout(() => {
      dispatch(removeNotification())
    }, duration)
  }
}
