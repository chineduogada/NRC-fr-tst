import React from 'react';
import classes from './MainArea.module.scss';
import QuickActions from '../../QuickActions/QuickActions';

const MainArea = props => {
  return (
    <main className={classes.MainArea}>
      <div className={classes.Center}>{props.children}</div>
      <QuickActions />
    </main>
  );
};

export default MainArea;
