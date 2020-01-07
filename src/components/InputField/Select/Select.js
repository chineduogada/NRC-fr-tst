import React from 'react';
import Option from './Option';

const select = (props) => {
  return <select id={props.id} onBlur={props.blurred} onChange={props.changed} className={props.className} defaultValue={props.defaultValue}>
    {props.options.map((option, i) => <Option key={i} name={option.name} value={option.name.toLowerCase()}>{option.name}</Option>)}
  </select>
};

export default select;
