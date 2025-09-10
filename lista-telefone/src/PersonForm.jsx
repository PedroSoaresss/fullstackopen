import React from 'react';

const PersonForm = ({ onSubmit, newName, onNameChange, newNumber, onNumberChange }) => (
  <form onSubmit={onSubmit}>
    <input value={newName} onChange={onNameChange} placeholder="Nome" />
    <input value={newNumber} onChange={onNumberChange} placeholder="Telefone" />
    <button type="submit">Adicionar</button>
  </form>
);

export default PersonForm;
