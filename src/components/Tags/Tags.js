import React from 'react';
import Tag from './Tag/Tag';
import classes from './Tags.module.css';

const Tags = (props) => {
  console.log(props);
  return (
    <div className={classes.Tags}>
      {props.tags.map((tag, i) => {
        return <Tag key={i}>{tag}</Tag>
      })}
    </div>
  );
}

export default Tags;
