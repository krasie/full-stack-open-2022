import React from "react";

const Numbers = ({persons,filter,del}) =>{
  const personsShow = filter === ''
  ? persons
  : persons.filter(persons => persons.name.indexOf(filter) != -1)
  return (<>{
    personsShow.map(
    (persons) => 
    <div key={persons.id}>
      {persons.name} {persons.number}
      <button onClick={()=>{del(persons.id,persons.name)}}>delete</button>
    </div>)
  }
  </>
  )
}

export default Numbers