import React from "react";
import "./Button.scss";
import PropTypes from "prop-types";

export default function Button({
	label,
	light,
	dark,
	fill,
	highlight,
	disabled
}) {
	const getClass = () => {
		let _class = "button";
		if (dark) _class += " dark";
		if (light) _class += " light";
		if (fill) _class += " fill";
		if (highlight) _class += " highlight";
		if (disabled) _class += " disabled";
		return _class;
	};
	return <button className={getClass()}>{label}</button>;
}

Button.propTypes = {
	label: PropTypes.string.isRequired,
	light: PropTypes.bool,
	dark: PropTypes.bool,
	fill: PropTypes.bool,
	highlight: PropTypes.bool,
	disabled: PropTypes.bool
};
