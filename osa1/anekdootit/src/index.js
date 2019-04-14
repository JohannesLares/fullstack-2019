import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const App = (props) => {
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState([])

    const random = () => {
        let random = Math.floor(Math.random() * anecdotes.length )
        setSelected(random);
    }

    const vote = (anecdote) => {
      var copy = [...votes]
        if(copy[anecdote] < 1 || copy[anecdote] === undefined){
          copy[anecdote] = 0;
        }
        copy[anecdote] += 1
        setVotes(copy)
        
    } 

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <p>{props.anecdotes[selected]}</p>
      <p>has {votes[selected]} votes</p>
      <button onClick={() => vote(selected)}>vote</button>
      <button onClick={random}>next anecdote</button>
      <h1>Anecdote with most votes</h1>
      <AncdoteWithMost votes={votes} />
    </div>
  )
}

const AncdoteWithMost = ({votes}) => {
  var most = 0;
  var max = 0;
  var i = 0;
  for(i in votes){
    if(votes[i] > max){
      max = votes[i];
      most = i
    }
  }
  return (
    <div>
      <p>{anecdotes[most]}</p>
      <p>has {max} votes</p>
    </div>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)