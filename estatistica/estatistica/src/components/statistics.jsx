import React, { useState } from 'react';

function Statistics({ good, neutral, bad }) {
  const total = good + neutral + bad;
  const average = total === 0 ? 0 : ((good * 1 + neutral * 0 + bad * -1) / total).toFixed(2);
  const positivePercentage = total === 0 ? 0 : ((good / total) * 100).toFixed(1);

  if (total === 0) {
    return <p>No feedback given yet.</p>;
  }

  return (
    <div>
      <h2>Statistics</h2>
      <p>Good: {good}</p>
      <p>Neutral: {neutral}</p>
      <p>Bad: {bad}</p>
      <p>Total: {total}</p>
      <p>Average score: {average}</p>
      <p>Positive feedback: {positivePercentage}%</p>
    </div>
  );
}

export default Statistics;