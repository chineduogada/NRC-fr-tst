import React from 'react';
import { Alert } from 'react-bootstrap';
import PropTypes from 'prop-types';
const Select = ({ name, error, label, options, ...rest }) => {
  return (
    <div className='form-group'>
      <label htmlFor={name}>{label}</label>
      <select {...rest} id={name} name={name} className='formControl'>
        <option value=''>-- select --</option>
        {options.map(option => (
          <option key={option.id} value={option.id}>
            {option.name}
          </option>
        ))}
      </select>
      {error && <Alert variant='danger'>{error}</Alert>}
    </div>
  );
};

Select.propTypes = {
  name: PropTypes.string,
  value: PropTypes.string,
  options: PropTypes.array,
  label: PropTypes.string,
  error: PropTypes.string,
  onChange: PropTypes.func
};

export default Select;
