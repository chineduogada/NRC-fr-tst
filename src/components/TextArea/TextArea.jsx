import React from "react";
import { Alert } from "react-bootstrap";
import PropTypes from "prop-types";
// import './Input.scss';

const TextArea = React.forwardRef(
  (
    {
      name,
      label,
      error,
      noBorder,
      placeholder,
      disabled,
      defaultValue,
      ...rest
    },
    ref
  ) => {
    const getClass = () => {
      let _class = "formControl";

      return (_class += noBorder ? " noBorder" : "");
    };

    return (
      <div className="form-group">
        <label htmlFor={name}>{label}</label>
        <textarea
          className={getClass()}
          {...rest}
          ref={ref}
          disabled={disabled}
          placeholder={placeholder}
          defaultValue={defaultValue}
          id={name}
          name={name}
          autoComplete="true"
        ></textarea>
        {error && <Alert variant="danger">{error}</Alert>}
      </div>
    );
  }
);

TextArea.propTypes = {
  name: PropTypes.string,
  value: PropTypes.any,
  onChange: PropTypes.func,
  details: PropTypes.string,
  type: PropTypes.string,
  error: PropTypes.string,
  label: PropTypes.string
};

export default TextArea;
