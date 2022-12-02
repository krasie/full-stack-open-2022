import { useState } from 'react'

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients'
  ]

  const index  =  Math.floor((Math.random()*anecdotes.length))
  const [selected, setSelected] = useState(index)
  const [points, setPoints] = useState(new Uint8Array(anecdotes.length))

  const next = () =>{
    if(selected == (anecdotes.length - 1)){
      setSelected(0)
      return
    }
    setSelected(selected + 1)
  }

  const vote = () =>{
    const copy = [...points]
    copy[selected] += 1
    setPoints(copy) 
  }

  const mostVotes = () =>{
    var max = Math.max(...points);
    var indexOfMax = points.indexOf(max);
    return indexOfMax
    }


  return (
    <div>
      <h1>Anecdote of the day</h1>
      <div>{anecdotes[selected]}</div>
      <div>has {points[selected]} votes</div>
      <br />
      <button onClick={()=>vote()}>vote</button>
      <button onClick={()=>next()}>next anecdote</button>
      <h1>Anecdote with most votes</h1>
      <div>{anecdotes[mostVotes()]}</div>
      <div>has {points[mostVotes()]} votes</div>
    </div>
  )
}

export default App