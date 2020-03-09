import React from 'react';
import { GetImage } from '../../../services/employeeService';
import classes from './FaceCard.module.scss';

export default ({ data }) => {
  const { firstName, lastName, middleNames, department, gender } = data;
  return (
    <div className={classes.FaceCard}>
      <div className={classes.Header}>
      <div className={classes.ImageWrapper}>
        <GetImage imageSource={data.photo || null} />
      </div>
      </div>
      <div className={classes.Body}>
        <h5 className={classes.Name}>
          {lastName} {firstName} {middleNames}
        </h5>

        {department ? (
          <p>
            <span>Department:</span> {department}
          </p>
        ) : null}
        <p>
          <span>Gender:</span> {gender}
        </p>
        <p>
          <span>State:</span> {data.state}
        </p>
        {/* <p>{employeeStatus.description}</p> */}

        <div className={classes.Footer}></div>
      </div>
    </div>
  );
};
