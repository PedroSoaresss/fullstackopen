import { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import Filter from './Filter';
import PersonForm from './PersonForm';
import Persons from './Persons';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [filter, setFilter] = useState('');

  useEffect(() => {
    axios.get('http://localhost:3000/persons')
      .then(response => {
        setPersons(response.data);
      });
  }, []);

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  const addPerson = (event) => {
    event.preventDefault();
    if (persons.some(person => person.name.toLowerCase() === newName.trim().toLowerCase())) {
      alert(`A pessoa '${newName}' já está na lista telefônica.`);
      return;
    }
    setPersons(persons.concat({ name: newName, number: newNumber }));
    setNewName('');
    setNewNumber('');
  };

  const personsToShow = filter
    ? persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase()))
    : persons;

  return (
    <div>
      <h2>Lista Telefônica</h2>
      <Filter filter={filter} onChange={handleFilterChange} />
      <h3>Adicionar nova pessoa</h3>
      <PersonForm
        onSubmit={addPerson}
        newName={newName}
        onNameChange={handleNameChange}
        newNumber={newNumber}
        onNumberChange={handleNumberChange}
      />
      <h3>Pessoas</h3>
      <Persons persons={personsToShow} />
    </div>
  );
};

export default App;
