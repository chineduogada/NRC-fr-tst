import React from 'react';
import docs from './documentation.js';
import SyntaxHighLighter from '../../hoc/SyntaxHighLighter/SyntaxHighLighter';
import classes from './ImportDocumentation.module.scss';

export const getResourceDoc = resource => {
  return JSON.parse(docs)[resource];
};

export default ({ resource }) => {
  const { name, notes, schema, example } = getResourceDoc(resource);
  return (
    <div className={classes.Documentation}>
      <h5 className={classes.Name}>{name}</h5>

      <p className={classes.Notes}>{notes}</p>

      <div className={classes.Code}>
        <p>Headers and Types</p>
        <SyntaxHighLighter>{schema}</SyntaxHighLighter>
      </div>

      <div className={classes.Code}>
        <p>Examples</p>
        <SyntaxHighLighter>{example}</SyntaxHighLighter>
      </div>
    </div>
  );
};
