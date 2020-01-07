import React from 'react';
import { Link } from 'react-router-dom';
import { IoMdHome, IoIosMan, IoIosContacts, IoIosSchool, IoMdMedal } from 'react-icons/io';
import classes from './Aside.module.scss';

const Aside = props => (
  <aside className={classes.Aside}>
    <div className={classes.Brand}>
      <h1>
        <span>N R C</span> - HR
      </h1>
    </div>

    <div className={classes.Menu}>
      <ul>
        <li className={classes.Active}>
          <Link to="/">
            <span className="icon">
              <IoMdHome className="icon" />
            </span>
            <span>Dashboard</span>
          </Link>
        </li>
        <li className={classes}>
          <Link to="/employee">
            <span className="icon">
              <IoIosMan className="icon" />
            </span>
            <span>Employee</span>
          </Link>
        </li>
        <li className={classes}>
          <Link to="/department">
            <span className="icon">
              <IoIosContacts className="icon" />
            </span>
            <span>department</span>
          </Link>
        </li>
        <li className={classes}>
          <Link to="/training-schedule">
            <span className="icon">
              <IoMdHome className="icon" />
            </span>
            <span>Training Schedules</span>
          </Link>
        </li>
        <li className={classes}>
          <Link to="/training-records">
            <span className="icon">
              <IoMdHome className="icon" />
            </span>
            <span>Training Records</span>
          </Link>
        </li>
        <li className={classes}>
          <Link to="/successions">
            <span className="icon">
              <IoMdMedal className="icon" />
            </span>
            <span>Successions</span>
          </Link>
        </li>
        <li className={classes}>
          <Link to="/careers">
            <span className="icon">
              <IoIosSchool className="icon" />
            </span>
            <span>Careers</span>
          </Link>
        </li>
        <li className={classes}>
          <Link to="/job-incidence">
            <span className="icon">
              <IoMdHome className="icon" />
            </span>
            <span>Job Incedence</span>
          </Link>
        </li>
        <li className={classes}>
          <Link to="/reports">
            <span className="icon">
              <IoMdHome className="icon" />
            </span>
            <span>Reports</span>
          </Link>
        </li>

        <br />
        <br />

        <li className={classes}>
          <Link to="/job-incidence">
            <span className="icon">
              <IoMdHome className="icon" />
            </span>
            <span>preferences</span>
          </Link>
        </li>
        <li className={classes}>
          <Link to="/reports">
            <span className="icon">
              <IoMdHome className="icon" />
            </span>
            <span>support</span>
          </Link>
        </li>
      </ul>
    </div>
  </aside>
);

export default Aside;
