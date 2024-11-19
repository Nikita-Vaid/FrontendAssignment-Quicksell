import React from 'react';
import './Dropdown.css';

const Dropdown = ({ label, options, onChange }) => {
  const handleChange = (event) => {
    onChange(event.target.value);
  };

  return (
    <div className="dropdown">
      <label>{label}</label>
      <select onChange={handleChange}>
        {options.map(option => (
          <option key={option.key} value={option.key}>{option.value}</option>
        ))}
      </select>
    </div>
  );
};

export default Dropdown;
