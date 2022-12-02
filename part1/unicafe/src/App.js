import { useState } from 'react'

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const data = {good,neutral,bad}





  return (
    <div>
      <h1>give freeback</h1>
      <button onClick={()=>setGood(good + 1) }>good</button>
      <button onClick={()=>setNeutral(neutral + 1)}>neutral</button>
      <button onClick={()=>setBad(bad + 1)}>bad</button>
      <h1>Statistics</h1>
      <Statistics data={data}/>
    </div>
  )
}



const Statistics = (props) => {
  const {good,neutral,bad} = props.data
  const total = good + neutral + bad
  if(total == 0){
    return (
      <>
        <h5>No freeback given</h5>
      </>
    )
  }
  return(
    <div>
      <StatisticLine text="good" value = {good} />
      <StatisticLine text="neutral" value = {neutral} />
      <StatisticLine text="bad" value = {bad} />
      <StatisticLine text="all" value = {total} />
    </div>
  )
}

const StatisticLine = (props) =>{
  return(
    <div>{props.text} : {props.value}</div>
  )
}

export default App