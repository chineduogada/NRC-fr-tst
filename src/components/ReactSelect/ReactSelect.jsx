import React from 'react';
import Select from 'react-select';
import { Alert } from 'react-bootstrap';
import PropTypes from 'prop-types';

const ReactSelect = React.forwardRef(
  (
    {
      name,
      error,
      label,
      options,
      getSelectObjectOnChange,
      augmentedClassName,
      selectedOption,
      ...rest
    },
    ref
  ) => {
    return (
      <div className='form-group'>
        {label ? <label htmlFor={name}>{label}</label> : null}
        <Select
          {...rest}
          ref={ref}
          inputId={name}
          options={options}
          name={name}
          id={name}
          value={selectedOption}
          onChange={function(option) {
            const optionValue = Array.isArray(option)
              ? option
              : option
              ? option.value
              : '';
            const currentTarget = { ...this, value: optionValue };
            getSelectObjectOnChange({ currentTarget });
          }}
          defaultInputValue={selectedOption}
        />
        {error && <Alert variant='danger'>{error}</Alert>}
      </div>
    );
  }
);

ReactSelect.propTypes = {
  name: PropTypes.string,
  value: PropTypes.string,
  options: PropTypes.array,
  label: PropTypes.string,
  error: PropTypes.string,
  onChange: PropTypes.func
};

export default ReactSelect;
