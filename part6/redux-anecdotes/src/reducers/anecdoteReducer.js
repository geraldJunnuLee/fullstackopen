import { createSlice } from '@reduxjs/toolkit'
import anecdoteService from '../services/anecdotes'

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    addAnecdote: (state, action) => {
      const newAnecdote = action.payload
      return [...state, newAnecdote]
    },
    addVote: (state, action) => {
      const updatedAnecdoteId = action.payload.id
      const updatedAnecdoteVotes = action.payload
      return state.map((anecdote) =>
        anecdote.id !== updatedAnecdoteId ? anecdote : updatedAnecdoteVotes
      )
    },
    appendAnecdote: (state, action) => {
      state.push(action.payload)
    },
    setAnecdotes: (state, action) => {
      return action.payload
    },
  },
})

export const { addAnecdote, addVote, appendAnecdote, setAnecdotes } =
  anecdoteSlice.actions
export default anecdoteSlice.reducer

export const initializeAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export const createAnecdote = (anecdoteText) => {
  return async (dispatch) => {
    const createdAnecdote = await anecdoteService.createNew(anecdoteText)
    dispatch(addAnecdote(createdAnecdote))
  }
}

export const addVoteToAnecdoteBackend = (id) => {
  return async (dispatch) => {
    const voteAdded = await anecdoteService.addVoteToAnecdote(id)
    dispatch(addVote(voteAdded))
  }
}
