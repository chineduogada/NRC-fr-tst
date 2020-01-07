import React from 'react';
import classes from './InputField.module.css';
import Select from './Select/Select';

// generate Field based on field `type`
const genarateField = (props) => {
  const { id, type, placeholder, options } = props;

  const INPUT = <input onChange={props.changed} onBlur={props.blurred} className={classes.Control} id={id} type={type} placeholder={placeholder} defaultValue={props.value}/>;
  const TEXTAREA = <textarea onChange={props.changed} onBlur={props.blurred} className={`${classes.Control} ${props.augmentedClassName}`} id={id} type={type} placeholder={placeholder}defaultValue={props.value}></textarea>;
  const SELECT = <Select changed={props.changed} blurred={props.blurred} id={id} className={classes.Control} options={options} defaultValue={props.value}/>

  const typeToField = {
    text: INPUT,
    checkbox: INPUT,
    file: INPUT,
    radio: INPUT,
    email: INPUT,
    password: INPUT,
    textarea: TEXTAREA,
    select: SELECT
  }

  return typeToField[type];
};


const inputField = (props) => {
  return (
    <div className={classes.InputField}>
      {props.name ? <label className={classes.Label} htmlFor={props.id}>{props.name}</label> : null}
      {genarateField(props)}
    </div>
  );
};

export default inputField
