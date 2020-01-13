import React from "react";
import "./Button.scss";
import PropTypes from "prop-types";

export default function Button({ label, fill, highlight, disabled, ...rest }) {
	const getClass = () => {
		let _class = "button";
		if (fill) _class += " fill";
		if (highlight) _class += " highlight";
		if (disabled) _class += " disabled";
		return _class;
	};
	return (
		<button data-test="button" className={getClass()} {...rest}>
			<span data-test="label">{label}</span>
		</button>
	);
}

Button.propTypes = {
	label: PropTypes.any.isRequired,
	light: PropTypes.bool,
	dark: PropTypes.bool,
	fill: PropTypes.bool,
	highlight: PropTypes.bool,
	disabled: PropTypes.bool
};
