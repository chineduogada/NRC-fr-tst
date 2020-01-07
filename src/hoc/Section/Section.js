import React from 'react';
import classes from './Section.module.css';

const section = (props) => {
  const titleExists = props.title !== undefined;
  return (
    <section className={classes.Section} id={props.id}>
      {titleExists ? <h2 className={classes.SectionTitle}>{props.title}</h2> : null}

      {props.children}
    </section>
  );
}

export default section;
