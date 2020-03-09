import React from 'react';
import notFoundImg from '../../assets/images/not-found-img.png';
import classes from './NotFound.module.scss';

export default ({ message }) => {
  return (
    <div className={classes.NotFound}>
      <div className={classes.Image}>
        <img className="img" src={notFoundImg} alt="not found" />
        <p>
          We looked everywhere, but nothing was found. Please, try to tweak your
          query a little
        </p>
      </div>
    </div>
  );
};
