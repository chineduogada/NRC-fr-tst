import React from 'react';

const option = (props) => {
  return <option value={props.value.toLowerCase()}>{props.children}</option>
}

export default option;
