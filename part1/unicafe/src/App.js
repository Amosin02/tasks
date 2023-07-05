import { useState } from "react";

const ButtonExercise = ({ handleClick, text}) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

const StatisticLine = ({ text, value }) => (
  <tr>
    <td>{text}</td>
    <td>{value}</td>
  </tr>
)

const Statistics = ({ good, neutral, bad }) => {
  const total = good + neutral + bad
  const ave = ((good * 1) + (bad * -1) + (neutral * 0))/ total
  const positiveRate = (100 * good) / total

  if (total === 0) {
    return (
      <div>
        No Feedback Given
      </div>
    )
  }
  return(
    <div>
      <table>
        <tbody>
          <StatisticLine text="Good" value={good} />
          <StatisticLine text="Neutral" value={neutral} />
          <StatisticLine text="Bad" value={bad} />
          <StatisticLine text="All" value={total} />

          <StatisticLine text="Average" value={ave} />
          <StatisticLine text="Positive" value={positiveRate + " %"} />
        </tbody>
      </table>
    </div>
  )
}

function App() {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGoodClick = () => {
    const setGoodUpdated = good + 1
    setGood(setGoodUpdated)
    //const goodAveScore = setGoodUpdated * 1
    //setAve((goodAveScore) / all)
  }

  const handleNeutralClick = () => {
    const setNeutralUpdated = neutral + 1
    setNeutral(setNeutralUpdated)
  }

  const handleBadClick = () => {
    const setBadUpdated = bad + 1
    setBad(setBadUpdated)
    //const badAveScore = setBadUpdated * -1
    //setAve((badAveScore) / all)
  }

  return (
    <div>
      <h1>Give Feedback</h1>
      <ButtonExercise handleClick={handleGoodClick} text="good" />
      <ButtonExercise handleClick={handleNeutralClick} text="neutral" />
      <ButtonExercise handleClick={handleBadClick} text="bad" />

      <br/>
      <br/>
      <h1>Statistics</h1>
      <Statistics good={good} bad={bad} neutral={neutral} />
    </div>
  );
}

export default App;

