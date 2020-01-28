import React from 'react';
import classes from './Dropdown.module.scss';
// import DropdownItems from './DropdownItems/DropdownItems';
import { IoIosArrowDropdown } from 'react-icons/io';

const dropdown = props => {
  return (
    <div className={classes.Dropdown}>
      <div className={classes.MenuIcon}>
        {props.trigger} <IoIosArrowDropdown />
      </div>

      {/* Dropdown Items */}
      <div className={classes.Items}>{props.children}</div>
    </div>
  );
};

export default dropdown;
