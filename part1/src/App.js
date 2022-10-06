import { useState } from 'react'

const Points = ({ points }) => {
  return <p>has {points} votes</p>;
}

const Button = ({ onClick, text }) => {
  return <button onClick={onClick}>{text}</button>;
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.'
  ]

  const [selected, setSelected] = useState(0);
  const [points, setPoint] = useState(new Array(anecdotes.length).fill(0));

  // console.log("Points", points);

  // Gets a random anecdote
  const randomAnecdote = () => {
    const randomValue = Math.floor(Math.random() * anecdotes.length)
    // console.log("Random", randomValue);
    setSelected(randomValue);
  }

  // Adds points to array
  const addPoint = () => {
    const copy = [...points];
    copy[selected] += 1;
    setPoint(copy);
  }

  // finds index of largest number in points array
  function findLargestIndex(points)
  {
    const largestNumber = Math.max(...points);
    // Both valid
    // const arrayIndex = points.findIndex((index) => index === largestNumber);
    const arrayIndex = points.indexOf(largestNumber);
    return arrayIndex;
  }

  // Gets the index of largest number in points array
  const index = findLargestIndex(points);
  // console.log(index); 

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <p>{anecdotes[selected]}</p>
      <Points points={points[selected]} />
      <Button onClick={addPoint} text={"vote"} />
      <Button onClick={randomAnecdote} text={"next anectode"} />
      <h1>Anecdote with most votes</h1>
      <p>{anecdotes[index]}</p>
      <Points points={points[index]} />
    </div>
  )
}

export default App