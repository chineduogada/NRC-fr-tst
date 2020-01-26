import React from 'react';
import classes from './InformationBlock.module.scss';

export default function InformationBlock({ title, children }) {
  return (
    <section className="sect">
      <div className={classes.InfoBlock}>
        {title ? <h6 className={classes.Title}>{title}</h6> : null}

        {children}
      </div>
    </section>
  );
}
