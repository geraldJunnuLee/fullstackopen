import { useSelector, useDispatch } from 'react-redux'
import { addVoteToAnecdoteBackend } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteList = () => {
  const anecdotes = useSelector((state) => state.anecdotes)
  const filterValue = useSelector((state) => state.filter)
  const dispatch = useDispatch()
  const sortableAnecdotesList = [...anecdotes]
  sortableAnecdotesList.sort((a, b) => b.votes - a.votes)

  const vote = (id) => {
    const findAnecdote = anecdotes.find((anecdote) => anecdote.id === id)
    const anecdoteText = findAnecdote.text
    dispatch(addVoteToAnecdoteBackend(id))
    dispatch(setNotification(`you voted '${anecdoteText}'`, 5000))
  }

  return (
    <div>
      {sortableAnecdotesList
        .filter((anecdote) =>
          anecdote.text.toLowerCase().includes(filterValue.toLowerCase())
        )
        .map((anecdote) => (
          <div key={anecdote.id}>
            <div>{anecdote.text}</div>
            <div>
              has {anecdote.votes}
              <button onClick={() => vote(anecdote.id)}>vote</button>
            </div>
          </div>
        ))
        .sort((a, b) => b.votes - a.votes)}
    </div>
  )
}

export default AnecdoteList
