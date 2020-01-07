import React from 'react';
import classes from './MainArea.module.scss';

const MainArea = props => {
  return <main className={classes.MainArea}>{props.children}</main>;
};

export default MainArea;
