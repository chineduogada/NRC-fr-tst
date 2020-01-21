import React from 'react';
import Loader from '../../Loader/Loader';
import '../DataCard.module.scss';
import classes from './BasicDataCard.module.scss';

const BasicDataCard = props => {
  return (
    <div className={classes.Summary}>
      <div className={classes.Title}>
        {this.state.numEmployees ? (
          <>
            <h4>{this.state.numEmployees}</h4>
            <p> Employees</p>
          </>
        ) : (
          <Loader />
        )}
      </div>
    </div>
  );
};

export default BasicDataCard;
