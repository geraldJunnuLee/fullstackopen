import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getAnecdotes, updateAnecdote } from './requests'
import { useNotificationDispatch } from './NotificationContext'
import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'

const App = () => {
  const nofiticationDispatch = useNotificationDispatch()
  const queryClient = useQueryClient()

  const updateAnecdoteMutation = useMutation({
    mutationFn: updateAnecdote,
    onSuccess: (updateAnecdote) => {
      queryClient.invalidateQueries({ queryKey: ['anecdotes'] })
      nofiticationDispatch({
        type: 'VOTE_ANECDOTE',
        payload: `anecdote '${updateAnecdote.content}' voted`,
      })
    },
  })

  const handleVote = (anecdote) => {
    const updateAnecdoteVotes = {
      ...anecdote,
      votes: anecdote.votes + 1,
    }
    updateAnecdoteMutation.mutate(updateAnecdoteVotes)
  }

  const { isLoading, isError, data } = useQuery({
    queryKey: ['anecdotes'],
    queryFn: getAnecdotes,
    retry: 1,
    refetchOnWindowFocus: false,
  })

  if (isLoading) {
    return <div>loading data...</div>
  }

  if (isError)
    return <div>anecdote service not available due to problems in server</div>

  const anecdotes = data

  return (
    <div>
      <h3>Anecdote app</h3>

      <Notification />
      <AnecdoteForm />

      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  )
}

export default App
