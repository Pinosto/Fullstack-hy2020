import React, { useState, useEffect } from 'react'
import PersonForm from "./components/PersonForm"
import Filter from "./components/Filter"
import Numbers from "./components/Numbers"
import numberService from './services/numbers'
import Notification from './components/Notification'
import './App.css'


const App = () => {

  const [persons, setPersons] = useState([])

  useEffect(() => {
    console.log('effect')
    numberService
      .getAll()
      .then(initialNumbers => {
        console.log('promise fulfilled')
        setPersons(initialNumbers)
        console.log(initialNumbers)
      })
  }, [])
  console.log('render', persons.length, 'numbers')

  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setNewFilter] = useState('')
  const inputMessage= 'Syötä uusi henkilö'
  const [message, setMessage] = useState(null)
  const [deleteMessage, setdeleteMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

  const addPerson = (event) => {

    event.preventDefault()
    if (persons.some((person) => person.name === newName)) {
      if (window.confirm(`${newName} on jo luettelossa, korvataanko vanha numero`)) {
        const updatePersonId = persons.find(p => p.name === newName).id
        const personObject = {
          name: newName,
          number: newNumber
        }
        numberService
          .update(personObject, updatePersonId)
          .then(changedPerson => {
            setPersons(persons.map(p => p.id !== updatePersonId ? p : changedPerson))
            setNewName('')
            setNewNumber('')
            setMessage(`Numero korvattu: ${changedPerson.name}`)
            setTimeout(() => {
              setMessage(null)
            },5000)
          })
      }

    } else {
      const personObject = {
        name: newName,
        number: newNumber
      }
      numberService
        .create(personObject)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          setNewName('')
          setNewNumber('')
          console.log('3000')
          setMessage(`Lisätty henkilö: ${returnedPerson.name}`)
          setTimeout(() => {
            setMessage(null)
          },5000)
        })
        .catch(error => { 
          console.log(error.response.data)         
          setErrorMessage(`${JSON.stringify( error.response.data)}`)
          setTimeout(() => {
            setErrorMessage(null)
          }, 5000);
        })
    }
  }

  const removePerson = (id, name) => {

    if (window.confirm(`Do you realy want delete ${name}`)) {
      numberService
        .remove(id)
        .then(returnedPerson => {
          console.log(returnedPerson)
          setPersons(persons.filter(p => p.id !== id))
          setdeleteMessage(`Removed: ${name}`)
          setTimeout(() => {
            setdeleteMessage(null)
          },5000)
        })
        .catch(error => {
          setPersons(persons.filter(p => p.id !== id))
          setErrorMessage(`${name} on jo poistettu palvelimelta`)
          setTimeout(() => {
            setErrorMessage(null)
          }, 5000);
        })
    }
  }

  const handleFilter = (event) => {
    console.log(event.target.value)
    setNewFilter(event.target.value)
  }
  const handlePersonAdd = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }
  const handleNumberAdd = (event) => {
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }

  return (
    <div className="app">
      <h2>Phonebook</h2>
      <Filter handleFilter={handleFilter} />

      <h3>Add a new</h3>
      <Notification message={message} inputMessage={inputMessage}/>
      <PersonForm addPerson={addPerson} newName={newName} handlePersonAdd={handlePersonAdd} newNumber={newNumber} handleNumberAdd={handleNumberAdd} />

      <h2>Numbers</h2>
      <Notification deleteMessage={deleteMessage} errorMessage={errorMessage}/>
      <Numbers persons={persons} filter={filter} removePerson={removePerson} />
    </div>
  )

}

export default App