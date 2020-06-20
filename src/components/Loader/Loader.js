import React from 'react';
import { ClipLoader, ScaleLoader } from 'react-spinners';
import classes from './Loader.module.scss';

export const Spinner = ({ size }) => {
  return <ClipLoader size={size || 25} loading={true} />;
};

export const Scaler = (props) => {
  return <ScaleLoader loading={true} />;
};

const Loader = ({ brand, message }) => {
  return (
    <div className={classes.Loader}>
      <div className={classes.LoaderContainer} data-test="LoaderContainer">
        {brand ? (
          <h3 className="brand" data-test="brand">
            {brand}
          </h3>
        ) : null}
      </div>
      <Scaler />
      {message ? <p className={classes.LoaderMessage}>{message}</p> : null}
    </div>
  );
};

export default Loader;
