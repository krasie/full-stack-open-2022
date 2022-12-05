import { useState,useEffect  } from 'react'
import axios from 'axios'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Numbers from './components/Numbers'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newPersons, setNewPersons] = useState({name : '',number:''})
  const [filter, setFilter] = useState('') 

  useEffect(()=>{
    axios.get('http://localhost:3001/persons').then(
      response => setPersons(response.data)
    )
  }, [])

  const addPhonebook = (event) => {
    event.preventDefault()
    if(persons.find(persons=>persons.name===newPersons.name)){
      alert(`${newPersons.name} is already added to phonebook`)
      return
    }
    const id = persons.reduce((p,v) => p.id < v.id ? v : p ).id + 1
    setPersons(persons.concat({...newPersons,id:id}))
    setNewPersons({name : '',number:''})
  }

  const handleNewName = (event) => {
    setNewPersons({...newPersons,name:event.target.value})
  }

  const handleNewPhone = (event) => {
    setNewPersons({...newPersons,number:event.target.value})
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