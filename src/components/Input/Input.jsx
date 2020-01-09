import React from "react";
import { Alert } from "react-bootstrap";
import PropTypes from "prop-types";
import "./Input.scss";

const Input = ({
	name,
	label,
	error,
	noBorder,
	placeholder,
	disabled,
	defaultValue,
	...rest
}) => {
	const getClass = () => {
		let _class = "formControl";

		return (_class += noBorder ? " noBorder" : "");
	};

	return (
		<div className="form-group">
			<label htmlFor={name}>{label}</label>
			<input
				className={getClass()}
				{...rest}
				disabled={disabled}
				placeholder={placeholder}
				defaultValue={defaultValue}
				id={name}
				name={name}
				autoComplete="true"
			/>
			{error && <Alert variant="danger">{error}</Alert>}
		</div>
	);
};

Input.propTypes = {
	name: PropTypes.string,
	value: PropTypes.any,
	onChange: PropTypes.func,
	details: PropTypes.string,
	type: PropTypes.string,
	error: PropTypes.string,
	label: PropTypes.string
};

export default Input;
