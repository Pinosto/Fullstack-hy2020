import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import "./index.css"

const Button = (props) => (
  <button onClick={props.onClick}>{props.text}</button>
)

const ViewAnecdote = (props) => {
  if (props.anectode === undefined) {
    return (
      <p>no votes</p>
    )
  }
  return (
    <p>{props.anectode}<br />has {props.votes} votes</p>
  )
}

const nextRandom = (list) => Math.floor(Math.random() * list.length)


const App = (props) => {
  const [selected, setSelected] = useState(nextRandom(props.anecdotes))
  const arrayVotes = new Uint8Array(props.anecdotes.length);
  const [votes, setVotes] = useState(arrayVotes)
  const [mostVotes, setMostVotes] = useState()
  console.log(votes)

  const voteHandler = () => {
    let modVotes = [...votes];
    modVotes[selected]++;
    setVotes(modVotes);
    setMostVotes(modVotes.indexOf(Math.max(...modVotes)))
  }

  return (
    <div>
      <h1>Anectode of the day</h1>
      <ViewAnecdote anectode={props.anecdotes[selected]} votes={votes[selected]} />
      <Button onClick={voteHandler} text='vote' />
      <Button onClick={() => setSelected(nextRandom(props.anecdotes))} text='next anectode' />
      <h1>Anectode with most votes</h1>
      <ViewAnecdote anectode={props.anecdotes[mostVotes]} votes={votes[mostVotes]} />
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