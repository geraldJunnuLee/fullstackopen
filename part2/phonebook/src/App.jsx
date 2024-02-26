import { useEffect, useState } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import personService from './services/personsService'
import Notification from './components/Notification'
import './App.css'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newPhoneNumber, setNewPhoneNumber] = useState('')
  const [searchNameValue, setSearchNameValue] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)
  const [successMessage, setSuccessMessage] = useState(null)

  useEffect(() => {
    personService.getAll().then((response) => {
      const returnedPersonsList = response.data
      setPersons(returnedPersonsList)
    })
  }, [])

  const handleSetName = ({ target }) => {
    setNewName(target.value)
  }

  const handleSetNewPhoneNumber = ({ target }) => {
    setNewPhoneNumber(target.value)
  }

  const handleSearchNameValue = ({ target }) => {
    setSearchNameValue(target.value)
  }

  const handleAddNewName = (event) => {
    event.preventDefault()
    const foundPerson = persons.find(
      (person) => person.name.toLowerCase() === newName.toLowerCase()
    )
    if (foundPerson) {
      if (
        window.confirm(
          `${foundPerson.name} is already added to phonebook, replace the old number with a new one?`
        )
      ) {
        const updatedPerson = {
          ...foundPerson,
          number: newPhoneNumber,
        }
        personService
          .update(updatedPerson.id, updatedPerson)
          .then((response) => {
            setPersons(
              persons.map((person) =>
                person.id !== foundPerson.id ? person : response.data
              )
            )
          })
          .catch(() => {
            setErrorMessage(
              `Information of ${foundPerson.name} has already been removed from server`
            )
            setTimeout(() => {
              setErrorMessage(null)
            }, 5000)
            setPersons(persons.filter((person) => person.id !== foundPerson.id))
          })
      }
      setNewName('')
      setNewPhoneNumber('')
      return
    }

    const newPerson = { name: newName, number: newPhoneNumber }
    personService
      .create(newPerson)
      .then((response) => {
        setPersons(persons.concat(response.data))
        setNewName('')
        setNewPhoneNumber('')
      })
      .then(() => {
        setSuccessMessage(`Added ${newName}`)
        setTimeout(() => {
          setSuccessMessage(null)
        }, 5000)
      })
      .catch((error) => {
        setErrorMessage(error.response.data.error)

        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
      })
  }

  const handleDeletePerson = (person) => {
    const id = person.id
    const name = person.name
    if (window.confirm(`delete ${name}`)) {
      personService
        .deletePerson(id)
        .then(() => {
          setPersons(persons.filter((person) => person.id !== id))
        })
        .catch((error) => {
          setErrorMessage(error.response.data)
          setTimeout(() => {
            setErrorMessage(null)
          }, 5000)
        })
    } else {
      return
    }
  }

  const filteredPersonList = persons.filter((person) => {
    if (searchNameValue.length === 0) return persons
    return person.name.toLowerCase().includes(searchNameValue)
  })

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification
        message={errorMessage ? errorMessage : successMessage}
        typeOfMessage={errorMessage ? 'error' : 'success'}
      />
      <Filter
        searchNameValue={searchNameValue}
        handleSearchNameValue={handleSearchNameValue}
      />
      <div>
        <h2>add a new</h2>
        <PersonForm
          newName={newName}
          newPhoneNumber={newPhoneNumber}
          handleSetName={handleSetName}
          handleSetNewPhoneNumber={handleSetNewPhoneNumber}
          handleAddNewName={handleAddNewName}
        />
      </div>
      <Persons
        filteredPersonList={filteredPersonList}
        handleDeletePerson={handleDeletePerson}
      />
    </div>
  )
}

export default App
