import { useState } from 'react'
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ]) 
  const [filter, setFilter] = useState('')
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('');

  // Adds new person to persons array
  const addNewPerson = (event) => {
    event.preventDefault();

    const newPerson = {
      name: newName,
      number: newNumber,
    }

    // Checks if whole object exists in array
    //console.log(persons.some(person => JSON.stringify(person) === JSON.stringify(newPerson)));

    // Checks if object with same name property exist in array, makes sure both are lowercase
    if(!persons.some(person => person.name.toLowerCase() === newPerson.name.toLowerCase()))
    {
      setPersons(persons.concat(newPerson));
      setNewName('');
      setNewNumber('');
    }
    else
    {
      alert(`${newName} is already added to phonebook`);
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
      <Persons persons={persons} filter={filter} />
    </div>
  )
}

export default App