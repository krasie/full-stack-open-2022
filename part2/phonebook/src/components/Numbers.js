import React from "react";

const Numbers = ({persons,filter}) =>{
  const personsShow = filter === ''
  ? persons
  : persons.filter(persons => persons.name.indexOf(filter) != -1)
  return (<>{personsShow.map((persons)=><div key={persons.id}>{persons.name} {persons.phone}</div>)}</>)
}

export default Numbers