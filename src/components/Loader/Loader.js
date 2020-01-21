import React from 'react';
import { Spinner } from 'react-bootstrap';
import './Loader.scss';

const Loader = ({ brand }) => {
  return (
    <div className='Loader' data-test='LoaderComponent'>
      {brand ? (
        <h3 className='Brand' data-test='brand'>
          {brand}
        </h3>
      ) : null}
      <Spinner animation='border' className='Spinner' data-test='spinner' />
    </div>
  );
};

export default Loader;
