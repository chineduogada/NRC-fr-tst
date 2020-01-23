import React from 'react';
import './Button.scss';
import PropTypes from 'prop-types';

export default function Button({
  label,
  fill,
  plain,
  highlight,
  disabled,
  danger,
  fullwidth,
  block,
  ...rest
}) {
  const getClass = () => {
    let _class = 'button';
    if (fill) _class += ' fill';
    if (plain) _class += ' plain';
    if (highlight) _class += ' highlight';
    if (danger) _class += ' danger';
    if (fullwidth) _class += ' fullwidth';
    if (block) _class += ' block';
    if (disabled) _class += ' disabled';
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
  plain: PropTypes.bool,
  danger: PropTypes.bool,
  fullWidth: PropTypes.bool,
  highlight: PropTypes.bool,
  disabled: PropTypes.bool
};
