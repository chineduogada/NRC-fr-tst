import React from 'react';
import { Spinner } from 'react-bootstrap';
import classes from './Loader.module.scss';

const Loader = ({ brand, message }) => {
  return (
    <>
      <div className={classes.Loader} data-test='LoaderComponent'>
        {brand ? (
          <h3 className={classes.Brand} data-test='brand'>
            {brand}
          </h3>
        ) : null}
        <Spinner animation='border' className='Spinner' data-test='spinner' />
      </div>
      {message ? <p className={classes.LoaderMessage}>{message}</p> : null}
    </>
  );
};

export default Loader;
