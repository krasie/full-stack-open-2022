import { useState } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Numbers from './components/Numbers'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', phone: '040-123456', id: 1 },
    { name: 'Ada Lovelace', phone: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', phone: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', phone: '39-23-6423122', id: 4 }
  ])
  const [newPersons, setNewPersons] = useState({name : '',phone:''})
  const [filter, setFilter] = useState('')  

  const addPhonebook = (event) => {
    event.preventDefault()
    if(persons.find(persons=>persons.name===newPersons.name)){
      alert(`${newPersons.name} is already added to phonebook`)
      return
    }
    const id = persons.reduce((p,v) => p.id < v.id ? v : p ).id + 1
    setPersons(persons.concat({...newPersons,id:id}))
    setNewPersons({name : '',phone:''})
  }

  const handleNewName = (event) => {
    setNewPersons({...newPersons,name:event.target.value})
  }

  const handleNewPhone = (event) => {
    setNewPersons({...newPersons,phone:event.target.value})
  }

  const handlefilter = (event) =>{
    setFilter(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filter={filter} handlefilter={handlefilter} />
      <h2>add a new</h2>
      <PersonForm persons={persons} newPersons={newPersons} filter={filter} addPhonebook={addPhonebook} handleNewName={handleNewName} handleNewPhone={handleNewPhone}/>
      <h2>Numbers</h2>
      <Numbers persons={persons} filter={filter} />
    </div>
  )
}

export default App