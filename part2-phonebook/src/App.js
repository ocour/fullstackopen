import { useState, useEffect } from 'react'
import axios from 'axios';
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [filter, setFilter] = useState('');
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');

  useEffect(() => {
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        setPersons(response.data);
      })
  }, [])

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