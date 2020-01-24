import React from 'react';
import classes from './Section.module.css';

const section = props => {
  const { id, title, subTitle, children } = props;
  return (
    <section className={classes.Section} id={id}>
      <div className={classes.Titles}>
        {title ? <h2 className={classes.SectionTitle}>{title}</h2> : null}

        {subTitle ? <p className={classes.SubTitle}>{subTitle}</p> : null}
      </div>
      {children}
    </section>
  );
};

export default section;
