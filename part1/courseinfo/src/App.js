const Header = (props) => {
  return(
    <h1>{props.course}</h1>
  )
}
const Part = (props) =>{
  return(
    <p>
        {props.part} {props.exercises}
    </p>
  )
}

const Content = (props) => {
  return (
    <div>
      {props.parts.map(part => <Part part={part.name} exercises={part.exercises}/> )}
    </div>
  )
}

const Total = (props) =>{
  let total = 0 
  props.parts.map(part => total += part.exercises)
  return(
    <p>Number of exercises {total}</p>
  )
}

const Course = (props) => {
  return(
    <>
    <Header course={props.course.name} />
    <Content parts={props.course.parts} />
    <Total parts={props.course.parts}  />
    </>
  )
}


const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  return (
    <div>
      <Course course={course}  />
    </div>
  )
}

export default App