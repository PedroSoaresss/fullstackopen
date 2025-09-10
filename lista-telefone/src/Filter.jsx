import React from 'react';

const Filter = ({ filter, onChange }) => (
  <div>
    <input value={filter} onChange={onChange} placeholder="Pesquisar por nome" />
  </div>
);

export default Filter;
