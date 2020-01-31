import React from 'react';
import classes from './TextTransform.module.scss';

/**
 * A Higher order component that applies text transformation
 * to its children
 */
const TextTransform = ({ fontCase, children }) => {
  let selectedFontCase;

  switch (fontCase) {
    case 'u':
      selectedFontCase = classes.UpperCase;
      break;
    case 'c':
      selectedFontCase = classes.Capitalized;
      break;
    case 'l':
      selectedFontCase = classes.LowerCase;
      break;
    default:
      selectedFontCase = null;
  }

  return <span className={selectedFontCase}>{children}</span>;
};

/**
 * Wraps a string or component around the `<TextTransform>`
 * component
 * @param { string || React.Component } child an object of string type or a component
 * @param { string } fontCase The font case to be applied to the text nodes wrapped
 * by the <TextTransform> component. Values are `c` for capitalize, `u` for uppercase
 * and `l` for lowercase. If no value is passed, no transformation will be applied
 *
 * @returns A <TextTransfrom> component
 */
export default (child, fontCase) => (
  <span>
    <TextTransform fontCase={fontCase}>{child}</TextTransform>
  </span>
);
