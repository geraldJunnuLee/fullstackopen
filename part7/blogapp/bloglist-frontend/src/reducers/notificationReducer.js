import { createSlice } from '@reduxjs/toolkit'

const initialState = null

const notificationReducer = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    displayNotification(state, action) {
      const text = action.payload.text
      const typeOfMessage = action.payload.typeOfMessage
      const notificationObject = {
        text,
        typeOfMessage,
      }
      state = notificationObject
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

export const setNotification = (text, typeOfMessage) => {
  return async (dispatch) => {
    dispatch(displayNotification({ text, typeOfMessage }))
    setTimeout(() => {
      dispatch(removeNotification())
    }, 5000)
  }
}
