<<<<<<< HEAD
import React from 'react';
import classes from './Button.module.css';
import PropTypes from 'prop-types';

export default function Button({
  label,
  light,
  dark,
  fill,
  highlight,
  disabled,
  size
}) {
  const getClass = () => {
    let _class = 'button';
    if (dark) _class += ' dark';
    if (light) _class += ' light';
    if (fill) _class += ' fill';
    if (highlight) _class += ' highlight';
    if (disabled) _class += ' disabled';
    return _class;
  };

  return <button className={`${classes.btn} btn-full-width`}>{label}</button>;
}

Button.propTypes = {
  label: PropTypes.string.isRequired,
  light: PropTypes.bool,
  dark: PropTypes.bool,
  fill: PropTypes.bool,
  highlight: PropTypes.bool,
  disabled: PropTypes.bool
=======
import React from "react";
import "./Button.scss";
import PropTypes from "prop-types";

export default function Button({
	label,
	light,
	dark,
	fill,
	highlight,
	disabled,
	...rest
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
>>>>>>> 84f15c05c6d63c8045a505fd9fcf9d3e791b8044
};
