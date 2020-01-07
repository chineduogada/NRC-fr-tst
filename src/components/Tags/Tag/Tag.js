import React from 'react';
import classes from './Tag.module.css';

const Tags = (props) => (
<div
  className={classes.Tag}
  onClick={props.clicked}>{props.children}</div>);

export default Tags;
