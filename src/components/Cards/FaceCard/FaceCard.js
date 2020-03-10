import React from 'react';
import { GetImage } from '../../../services/employeeService';
import { truncate } from '../../../helpers/strings';
import classes from './FaceCard.module.scss';

export default ({ data }) => {
  const {
    firstName,
    lastName,
    middleNames,
    department,
    gender,
    district
  } = data;
  return (
    <div className={classes.FaceCard}>
      <div className={classes.Header}>
        <div className={classes.ImageWrapper}>
          <GetImage imageSource={data.photo || null} />
        </div>
        <span
          className={`${classes.Status} employee-status ${data.employeeStatus}`}
        >
          {data.employeeStatus}
        </span>
      </div>
      <div className={classes.Body}>
        <h5 className={classes.Name}>
          {lastName} {firstName} {middleNames}
        </h5>

        {department ? (
          <p>
            <span>Department:</span> {truncate(department, 25)}
          </p>
        ) : null}

        <p>
          <span>Gender:</span> {gender}
        </p>
        <p>
          <span>State:</span> {data.state}
        </p>

        {department ? (
          <p>
            <span>Department:</span> {truncate(department, 25)}
          </p>
        ) : null}

        {district ? (
          <p>
            <span>District:</span> {truncate(district, 25)}
          </p>
        ) : null}

        <div className={classes.Footer}></div>
      </div>
    </div>
  );
};
