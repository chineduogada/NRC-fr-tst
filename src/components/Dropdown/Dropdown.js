import React from 'react';
import classes from './Dropdown.module.css';
import DropdownItems from './DropdownItems/DropdownItems';

const dropdown = (props) => {

  return (
    <div className={classes.Dropdown}>
      <div className={classes.MenuIcon}></div>

      {/* Dropdown Items */}
      <DropdownItems augmentedClassName={classes.MenuItems} items={props.items} />
    </div>
  );
};

export default dropdown;
