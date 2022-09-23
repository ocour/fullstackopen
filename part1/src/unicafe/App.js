import { useState } from 'react'

const StatisticLine = ({ text, value }) => {

  // If were are trying to display a presentage
  if(text === "positive")
  {
    return (
      <tr>
        <td>{text}</td>
        <td>{value} %</td>
      </tr>
    )
  }
  // Otherwise dont add the presentage symbol
  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  )
}

const Statistics = ({ statistics }) => {

  const all = statistics.good + statistics.neutral + statistics.bad;
  const average = (statistics.good - statistics.bad) / all;
  const positive = (statistics.good / all) * 100;

  if (all === 0) return <div>No feedback given</div>;

  return (
    <table>
      <tbody>
        <StatisticLine text={"good"} value={statistics.good} />
        <StatisticLine text={"neutral"} value={statistics.neutral} />
        <StatisticLine text={"bad"} value={statistics.bad} />
        <StatisticLine text={"all"} value={all} />
        <StatisticLine text={"average"} value={average} />
        <StatisticLine text={"positive"} value={positive} />
      </tbody>
    </table>
  )
}

const Button = ({ onClick, text }) => {
  return <button onClick={onClick}>{text}</button>
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const incrementGoodValue = () => setGood(good + 1);

  const incrementNeutralValue = () => setNeutral(neutral + 1);

  const incrementBadValue = () => setBad(bad + 1);

  // Array would work too, array[0] for good ect
  const statisticsObject = {
    good: good,
    neutral: neutral,
    bad: bad,
  }

  return (
    <div>
      <h1>give feedback</h1>
      <Button onClick={incrementGoodValue} text={"good"} />
      <Button onClick={incrementNeutralValue} text={"neutral"} />
      <Button onClick={incrementBadValue} text={"bad"} />
      <h1>statistics</h1>
      <Statistics statistics={statisticsObject} />
    </div>
  )
}

export default App