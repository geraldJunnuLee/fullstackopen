import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const createNew = async (anecdoteText) => {
  const newAnecdote = {
    text: anecdoteText,
    votes: 0,
  }
  const response = await axios.post(baseUrl, newAnecdote)
  return response.data
}

const addVoteToAnecdote = async (id) => {
  const getAnecdote = await axios.get(`${baseUrl}/${id}`)
  const updatedAnecdote = {
    ...getAnecdote.data,
    votes: getAnecdote.data.votes + 1,
  }
  const response = await axios.put(`${baseUrl}/${id}`, updatedAnecdote)
  return response.data
}

export default { getAll, createNew, addVoteToAnecdote }
