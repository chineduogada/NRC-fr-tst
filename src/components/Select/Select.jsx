import React from 'react';
import { Alert } from 'react-bootstrap';
import PropTypes from 'prop-types';

const Select = React.forwardRef(
  (
    {
      name,
      error,
      label,
      options,
      augmentedClassName,
      selectedOption,
      ...rest
    },
    ref
  ) => {
    return (
      <div className="form-group">
        {label ? <label htmlFor={name}>{label}</label> : null}
        <select
          {...rest}
          ref={ref}
          id={name}
          name={name}
          className={`formControl ${augmentedClassName}`}
          value={selectedOption}
        >
          <option value="">-- select --</option>
          {options.map(option => {
            return `${option.id}`.toLowerCase() ===
              `${selectedOption}`.toLowerCase() ? (
              <option className="annoying" key={option.id} value={option.id}>
                {option.name}
              </option>
            ) : (
              <option key={option.id} value={option.id}>
                {option.name}
              </option>
            );
          })}
        </select>
        {error && <Alert variant="danger">{error}</Alert>}
      </div>
    );
  }
);

Select.propTypes = {
  name: PropTypes.string,
  value: PropTypes.string,
  options: PropTypes.array,
  label: PropTypes.string,
  error: PropTypes.string,
  onChange: PropTypes.func
};

export default Select;
