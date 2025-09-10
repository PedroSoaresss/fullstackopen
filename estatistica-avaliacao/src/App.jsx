import { useState } from 'react'
import Estistics from './components/statistics'
function App() {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const total = good + neutral + bad;

  return (
    <div>
      <h1>Give Feedback</h1>
      <button onClick={() => setGood(good + 1)}>Good</button>
      <button onClick={() => setNeutral(neutral + 1)}>Neutral</button>
      <button onClick={() => setBad(bad + 1)}>Bad</button>
      {total > 0 && (
        <Estistics good={good} neutral={neutral} bad={bad} />
      )}
      {total === 0 && (
        <p>No feedback given yet.</p>
      )}
    </div>
  )
}

export default App
