import { useState } from 'react'

const Button = ({text, handleClick}) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

const VoteText = ({votes}) => (
  <div>Has {votes} votes</div>
)

const TopAnecdote = ({ votes, anecdotes }) => {
  const copy = [...votes]
  let copyInd = copy.indexOf(Math.max(...copy)) //finding the index of the highest voted anecdote
  const TopAnecdote = anecdotes[copyInd]
  const numberOfVotes = votes[copyInd]
  return(
    <div>
      {TopAnecdote} <br />
      has {numberOfVotes} votes
    </div>
  )
}

function App() {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]
   
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState([])

  if (votes.length === 0) {
    const arrayVotes = new Array(anecdotes.length+1).join('0').split('').map(parseFloat)
    setVotes(arrayVotes)    
  }

  const generateNew = () => {
    const randomNum = Math.floor(Math.random() * 8 )
    setSelected(randomNum)
  }

  const voteAnecdote = () => {
    const copy = [...votes]
    const updatedVote = copy[selected] + 1

    copy[selected] = updatedVote

    setVotes(copy)
  }

  return (
    <div>
      <h1>Anecdote of the Day</h1>

      {anecdotes[selected]}<br/>
      <VoteText votes={votes[selected]} />
      <Button text="Vote" handleClick={voteAnecdote} />
      <Button text="Next Anecdote" handleClick={generateNew} />

      <h1>Anecdote With Most Votes</h1>
      <TopAnecdote votes={votes} anecdotes={anecdotes} />
    </div>
  );
}

export default App;
