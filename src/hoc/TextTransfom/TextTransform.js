import React from 'react';
import classes from '*.module.css';

/**
 * A Higher order component that applies text transformation
 * to its children
 */
const TextTransform  = ({ fontCase, children }) => {
    let selectedFontCase;

    switch(fontCase) {
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
            break;
}

    return (
        <span></span>
    );
}