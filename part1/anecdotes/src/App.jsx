import { useState } from 'react'

function App() {
  const [randomNumber, setRandomNumber] = useState(0)
  const [points, setPoints] = useState({
    0: 0,
    1: 0,
    2: 0,
    3: 0,
    4: 0,
    5: 0,
    6: 0,
    7: 0,
  })
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.',
  ]

  const handleAddVote = () => {
    const copy = { ...points }
    copy[randomNumber] += 1
    setPoints(copy)
  }

  let maxValue = 0
  let maxKey = 0
  for (const [key, value] of Object.entries(points)) {
    if (value > maxValue) {
      maxValue = value
      maxKey = key
    }
  }

  return (
    <div>
      <div>
        <h2>Anecdote of the day</h2>
        <div>{anecdotes[randomNumber]}</div>
        <div>has {points[randomNumber]} votes</div>
        <button onClick={handleAddVote}>vote</button>
        <button onClick={() => setRandomNumber(Math.floor(Math.random() * 8))}>
          next anecdote
        </button>
      </div>
      {maxValue === 0 ? (
        <div>no votes yet</div>
      ) : (
        <div>
          <h2>Anecdote with the most votes</h2>
          <p>{anecdotes[maxKey]}</p>
          <p>has {maxValue} votes</p>
        </div>
      )}
    </div>
  )
}

export default App
