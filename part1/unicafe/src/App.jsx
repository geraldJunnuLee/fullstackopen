import { useState } from 'react'
import Statistics from './components/Statistics'
import Buttons from './components/Buttons'

function App() {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [allClicks, setAllClicks] = useState(0)

  const average = (good - bad) / allClicks
  const positive = (good / allClicks) * 100

  return (
    <div>
      <div>
        <h2>give feedback</h2>
        <div>
          <Buttons
            good={good}
            setGood={setGood}
            neutral={neutral}
            setNeutral={setNeutral}
            bad={bad}
            setBad={setBad}
            allClicks={allClicks}
            setAllClicks={setAllClicks}
          />
        </div>
      </div>
      <div>
        <h2>statistics</h2>
        {allClicks === 0 ? (
          <div>No feedback given</div>
        ) : (
          <Statistics
            good={good}
            neutral={neutral}
            bad={bad}
            allClicks={allClicks}
            average={average}
            positive={positive}
          />
        )}
      </div>
    </div>
  )
}

export default App
