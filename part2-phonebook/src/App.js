import { useState, useEffect } from 'react'
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';
import personServices from './services/persons';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [filter, setFilter] = useState('');
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');

  // Gets all persons from database
  useEffect(() => {
    personServices
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])

  // Adds new person to persons array
  const addNewPerson = (event) => {
    event.preventDefault();
    const newPerson = {
      name: newName,
      number: newNumber,
    }

    // Checks whether or not person exist in database already
    // Case insensitive, doesent check spaces
    // Reason for using filter instead of array.some is because we need id if updating
    const personExists = persons.filter(person => person.name.toLowerCase() === newPerson.name.toLowerCase());

    // Checks whether or not found persons number is same as new number
    const personHasDifNum = !personExists.some(person => person.number === newPerson.number);

    // If person does not exist in database
    if(personExists.length === 0)
    {
      personServices
        .create(newPerson)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson));
          setNewName('');
          setNewNumber('');
        })
    }
    // if person exists in database but their existing number is not the same as new number
    else if(personExists.length > 0 && personHasDifNum)
    {
      if(window.confirm(`${newName} person exist with different number. new number is ${newNumber}`))
      {
        personServices
          .update(personExists[0].id, newPerson)
          .then(returnedPerson => {
            // If id is the same as updated persons id we set it, otherwise we leave existing persons info
            setPersons(persons.map(person => person.id === returnedPerson.id ? returnedPerson : person));
          })
      }
    }
    // If all is same
    else
    {
      alert(`${newName} is already added to phonebook`);
    }
  }

  const deletePerson = (id) => {
    const person = persons.filter(person => person.id === id);

    if(window.confirm(`Delete ${person[0].name} ?`))
    {
      personServices
      .deleteId(id)
      .then(response => {
        setPersons(persons.filter(person => person.id !== id));
      })
    }
  }

  // Handles input field
  const handleNewName = (event) => {
    setNewName(event.target.value);
  }

  const handleNewNumber = (event) => {
    setNewNumber(event.target.value);
  }
  
  const handleFilter = (event) => {
    setFilter(event.target.value);
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filter={filter} onChange={handleFilter}/>
      <h2>add a new</h2>
      <PersonForm 
        addNewPerson={addNewPerson} 
        newName={newName} 
        handleNewName={handleNewName} 
        newNumber={newNumber}
        handleNewNumber={handleNewNumber}
      />
      <h2>Numbers</h2>
      <Persons persons={persons} filter={filter} onDelete={deletePerson} />
    </div>
  )
}

export default App