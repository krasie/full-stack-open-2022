import { useState,useEffect  } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Numbers from './components/Numbers'
import Notification from './components/Notification'
import phoneSevice from './services/phones'


const App = () => {
  const [persons, setPersons] = useState([])
  const [newPersons, setNewPersons] = useState({name : '',number:''})
  const [filter, setFilter] = useState('') 
  const [message, setMessage] = useState({}) 

  useEffect(()=>{
    phoneSevice.getAll().then(
      resp => {setPersons(resp)}
    )
  }, [])

  const addPhonebook = (event) => {
    event.preventDefault()
    
    if(persons.find(persons=>persons.name===newPersons.name)){
      if (window.confirm(`${newPersons.name} is already added to phonebook,replace the old number with a new one ?`)) {
        const updatePersons = persons.find(persons => persons.name === newPersons.name)
        console.log(updatePersons)
        phoneSevice.update(updatePersons.id,{...updatePersons,number:newPersons.number}).then(
          resp => {
            setPersons(persons.map(obj => obj = obj.id === updatePersons.id ? resp : obj))
            showMessage(`Replaced ${resp.name} phone number`)
          }
        )
      }
      return
    }

    const id = persons.reduce((p,v) => p.id < v.id ? v : p ).id + 1
    phoneSevice.create({...newPersons,id:id}).then(
      resp => {
        setPersons(persons.concat(resp))
        showMessage(`Added ${resp.name}`)
      }
    ).catch(
      error => {
        showMessage(error.response.data.error,'error')
      }
    )
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

  const phoneDelete = (id,name) => {
    if (window.confirm(`Delete ${name}`)) {
      phoneSevice.del(id).then(
        () => {
          setPersons(persons.filter(n => n.id !== id))
          showMessage(`${name} removed`)
        }
      ).catch(
        err => {
          showMessage(`${name} has already been removed from server`,'error')
          setPersons(persons.filter(n => n.id !== id))
        }
      )
    }
  }

  const showMessage = (message,type='info') => {
    setMessage({message:message,type:type})
        setTimeout(() => {
          setMessage({})
        }, 5000)
  }

  

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message.message} type={message.type} />
      <Filter filter={filter} handlefilter={handlefilter} />
      <h2>add a new</h2>
      <PersonForm persons={persons} newPersons={newPersons} filter={filter} addPhonebook={addPhonebook} handleNewName={handleNewName} handleNewPhone={handleNewPhone}/>
      <h2>Numbers</h2>
      <Numbers persons={persons} filter={filter} del={phoneDelete}/>
    </div>
  )
}

export default App