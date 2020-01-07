import React from 'react';
import classes from './DropdownItems.module.css';
import DropdownItem from './DropdownItem/DropdownItem';

const dropdownItems = (props) => {
  const { items } = props;

  return (
    <ul className={`${classes.DropdownItems} ${props.augmentedClassName}`}>
      {
        items.map((item, i) => {
          return <DropdownItem key={i} to={item.to}>{item.name}</DropdownItem>
        })
      }
    </ul>
  );
};

export default dropdownItems;
