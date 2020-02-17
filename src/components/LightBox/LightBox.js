import React from 'react';
import classes from './LightBox.module.scss';

const LightBox = ({ children }) => {
  return <div className={classes.LightBox}>{children}</div>;
};

export default LightBox;
