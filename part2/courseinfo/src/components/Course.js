import React from "react";


const Header = (props) => {
    return(
      <h1>{props.course}</h1>
    )
  }


const Content = (props) => {
    return (
        <div>
        {props.parts.map(part => <Part part={part.name} exercises={part.exercises} key={part.id}/> )}
        </div>
    )
}

const Part = (props) =>{
    return(
        <p>
            {props.part} {props.exercises}
        </p>
    )
}

const Total = ({parts}) =>{
    const exercisesArray = parts.map(parts => parts.exercises)
    const total = exercisesArray.reduce((accumulator, currentValue) => {
        accumulator += currentValue
        return accumulator
    })
    return(
        <p>Total of {total} exercises</p>
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

export default Course