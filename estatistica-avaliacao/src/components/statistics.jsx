// Componente para exibir uma linha de estatística
function StatisticLine({ label, value }) {
  return (
    <p>{label}: {value}</p>
  )
}

export { StatisticLine };
// Componente para exibir um botão de feedback
function Button({ onClick, children }) {
  return (
    <button onClick={onClick}>{children}</button>
  )
}

export { Button };
function Estistics({ good, neutral, bad }) {
  const total = good + neutral + bad;
  const average = total === 0 ? 0 : ((good * 1 + neutral * 0 + bad * -1) / total).toFixed(2);
  const positivePercentage = total === 0 ? 0 : ((good / total) * 100).toFixed(1);

  return (
    <div>
      <h2>Statistics</h2>
      <StatisticLine label="Good" value={good} />
      <StatisticLine label="Neutral" value={neutral} />
      <StatisticLine label="Bad" value={bad} />
      <StatisticLine label="Total" value={total} />
      <StatisticLine label="Average score" value={average} />
      <StatisticLine label="Positive feedback" value={`${positivePercentage}%`} />
    </div>
  )
}

export default Estistics