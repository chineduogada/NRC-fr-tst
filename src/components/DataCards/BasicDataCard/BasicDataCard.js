import React from 'react';
import { IoIosLink } from 'react-icons/io';
import { Link } from 'react-router-dom';
import Loader from '../../../components/Loader/Loader';
import classes from './BasicDataCard.module.scss';

const BasicDataCard = ({ data, text, url, footer }) => {
  return (
    <div className={classes.BasicDataCard}>
      <div className={classes.Body}>
        {data !== null ? (
          <>
            <h4>{data}</h4>
            <p>{text}</p>
          </>
        ) : (
          <Loader />
        )}
      </div>
      <div className={classes.Footer}>{footer}</div>

      <span className={classes.LinkIcon}>
        <Link to={url}>
          <IoIosLink />
        </Link>
      </span>
    </div>
  );
};

export default BasicDataCard;
