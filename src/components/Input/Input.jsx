import React from "react";
import { Alert } from "react-bootstrap";
import PropTypes from "prop-types";

const Input = ({ name, placeholder, label, error, ...rest }) => {
	return (
		<div className="form-group">
			<label htmlFor={name}>{label}</label>
			<input
				{...rest}
				id={name}
				name={name}
				placeholder={placeholder}
				className="formControl"
				autoComplete="true"
			/>
			{error && <Alert variant="danger">{error}</Alert>}
		</div>
	);
};

Input.propTypes = {
	name: PropTypes.string.isRequired,
	value: PropTypes.any.isRequired,
	onChange: PropTypes.func.isRequired,
	details: PropTypes.string,
	type: PropTypes.string,
	error: PropTypes.string,
	label: PropTypes.string
};

export default Input;
