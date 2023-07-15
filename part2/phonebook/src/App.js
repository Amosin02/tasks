import { useState, useEffect } from 'react'
import noteService from './services/noteService'
import './index.css'

const Notification = ({ message }) => {
  if (message === null) {
    return null
  }
  
  return (
    <div className='error'>
      {message}
    </div>
  )
}

const Number = ({person, toggleDelete}) => {
  return(
    <li>
      {person.name} {person.number} 
      <button onClick={toggleDelete}>delete</button>
    </li>
  )
}

const OutputNumber = ({filterNames, setPersons}) => {
  const toggleDeleteOf = (id) => {
    const test = filterNames.filter(x => x.id === id)

    if (window.confirm(`Delete ${test[0].name}?`)){
      const updatedNames = filterNames.filter(x => x.id !== id)

      noteService
        .deleteContact(id)
        .then(setPersons(updatedNames))
    } 
  }
  return(
    <div>
      <ul>
        {filterNames.map(person =>
          <Number 
            person={person} 
            key={person.id}
            toggleDelete={() => toggleDeleteOf(person.id)}
          />
        )}
      </ul>
    </div>
  )
}

const AddContact = ({addNote, newName, handleNoteChange, newNumber, handleNumberChange}) => {
  return(
    <form onSubmit={addNote}>
        <div>
          <div>name: <input 
            value={newName}
            onChange={handleNoteChange}
            />
          </div>
          <div>number: <input 
            value={newNumber}
            onChange={handleNumberChange}
            />
          </div>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
  )
}

const Filter = ({filterLetter, handleFilterChange}) => {
  return(
    <div>
      <h2>Phonebook</h2>
        <form>
          <div>
            filter shown with <input 
              value={filterLetter}
              onChange={handleFilterChange}
            />
          </div>
      </form>
    </div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterLetter, setFilterLetter] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)

  useEffect(() => {
    noteService
      .getAll()
      .then(response => {
        setPersons(response.data)
      })
  }, [])

  const addNote = (event) => {
    event.preventDefault()

    const noteObject = {
      name: newName, // to be inputted in the persons array
      number: newNumber,
    }

    if (duplicateChecker() === false && numberDuplicateChecker() === false) {
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with new one?`)) {
        const data = persons.find(x => x.name === newName)
        const changeNumber = { ...data, number: newNumber}

        noteService
        .update(data.id, changeNumber)
        .then(response => {
          setPersons(persons.map(x => x.id !== data.id ? x : response.data))
        })
      }
    } else if (duplicateChecker() === true) {
      noteService
      .create(noteObject)
      .then(response => {
        setPersons(persons.concat(response.data))
        setNewName('')
        setNewNumber('')
        
        setErrorMessage(`Added ${newName}`)
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000);
      })
    } else {
      window.alert(`${newName} is already added to phonebook`) }
      setNewName('')
      setNewNumber('')
  }

  const duplicateChecker = () => {    
    const listOfNames = persons.map(x => x.name.toLowerCase())
    return listOfNames.includes(newName.toLowerCase()) ? false : true
  }

  const numberDuplicateChecker = () => {
    const dataTest = persons.find(x => x.name === newName)
    return dataTest.number === newNumber ? true : false
  }

  const handleNoteChange = (event) => {
    setNewName(event.target.value) // to get what is being inputted
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    setFilterLetter(event.target.value)
  }

  const filterNames = filterLetter === ''
  ? persons
  : persons
    .filter(x => x.name.toLowerCase().includes(filterLetter.toLowerCase()))

  return (
    <div>
      <Filter filterLetter={filterLetter} handleFilterChange={handleFilterChange}/>
      
      <h2>Add new contact</h2>
      <Notification message={errorMessage}/>
      <AddContact addNote={addNote} newName={newName} handleNoteChange={handleNoteChange} newNumber={newNumber} handleNumberChange={handleNumberChange} />

      <h2>Numbers</h2>
        <OutputNumber filterNames={filterNames} setPersons={setPersons}/>
    </div>
  )
}

export default App