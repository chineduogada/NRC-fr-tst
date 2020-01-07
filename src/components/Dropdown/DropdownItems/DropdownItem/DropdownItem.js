import React from 'react';
import { Link } from 'react-router-dom';
import classes from './DropdownItem.module.css';

const dropdownItem = (props) => {
  return (
      <li className={classes.DropdownItem}><Link to={props.to}>{props.children}</Link></li>
  );
};

export default dropdownItem;
