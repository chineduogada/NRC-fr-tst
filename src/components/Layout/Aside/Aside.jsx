import React, { Component } from 'react';
import { IoMdPerson, IoMdCloudUpload } from 'react-icons/io';
import { Link, withRouter } from 'react-router-dom';
import {
  IoMdHome,
  IoIosMan,
  IoIosClose,
  IoIosSchool,
  IoMdMedal,
  IoIosCalendar,
} from 'react-icons/io';
import {
  MdSettings,
  // MdBuild,
  MdHelp,
  MdPieChart,
  MdBook,
  MdFlag,
} from 'react-icons/md';
import classes from './Aside.module.scss';

class Aside extends Component {
  render() {
    const { show } = this.props;
    const activeNavItem = this.props.location.pathname.split('/')[1];
    console.log(activeNavItem);

    return (
      <aside
        className={`${classes.Aside} ${show ? classes.Show : classes.Hide}`}
      >
        <div className={classes.Brand}>
          <h1>
            <span>P R M</span>
          </h1>
          <IoIosClose
            className={`${classes.CloseIcon} icon show-until-tablet`}
            size="25px"
            onClick={this.props.handleCloseAside}
          />
        </div>

        <div className={classes.Menu}>
          <ul>
            <li
              onClick={this.props.handleCloseAside}
              className={`${activeNavItem === '' ? classes.Active : null}`}
            >
              <Link to="/">
                <span className="icon">
                  <IoMdHome className="icon" />
                </span>
                <span>Dashboard</span>
              </Link>
            </li>
            <li
              onClick={this.props.handleCloseAside}
              className={`${
                activeNavItem === 'employees' ? classes.Active : null
              }`}
            >
              <Link to="/employees">
                <span className="icon">
                  <IoIosMan className="icon" />
                </span>
                <span>Employees</span>
              </Link>
            </li>
            <li
              onClick={this.props.handleCloseAside}
              className={`${
                activeNavItem === 'training-schedules' ? classes.Active : null
              }`}
            >
              <Link to="/training-schedules">
                <span className="icon">
                  <IoIosCalendar className="icon" />
                </span>
                <span>Training Schedules</span>
              </Link>
            </li>
            <li
              onClick={this.props.handleCloseAside}
              className={`${
                activeNavItem === 'training-records' ? classes.Active : null
              }`}
            >
              <Link to="/training-records">
                <span className="icon">
                  <MdBook className="icon" />
                </span>
                <span>Training Records</span>
              </Link>
            </li>
            <li
              onClick={this.props.handleCloseAside}
              className={`${
                activeNavItem === 'successions' ? classes.Active : null
              }`}
            >
              <Link to="/successions">
                <span className="icon">
                  <IoMdMedal className="icon" />
                </span>
                <span>Successions</span>
              </Link>
            </li>
            <li
              onClick={this.props.handleCloseAside}
              className={`${
                activeNavItem === 'careers' ? classes.Active : null
              }`}
            >
              <Link to="/careers">
                <span className="icon">
                  <IoIosSchool className="icon" />
                </span>
                <span>Careers</span>
              </Link>
            </li>
            <li
              onClick={this.props.handleCloseAside}
              className={`${
                activeNavItem === 'job-incidence' ? classes.Active : null
              }`}
            >
              <Link to="/job-incidence">
                <span className="icon">
                  <MdFlag className="icon" />
                </span>
                <span>Job Incedence</span>
              </Link>
            </li>
            <li
              onClick={this.props.handleCloseAside}
              className={`${
                activeNavItem === 'reports' ? classes.Active : null
              }`}
            >
              <Link to="/reports">
                <span className="icon">
                  <MdPieChart className="icon" />
                </span>
                <span>Reports</span>
              </Link>
            </li>

            <br />
            <br />

            {/* <li className={`${activeNavItem === '' ? classes.Active : null}`}>
          <Link to='/preferences'>
            <span className='icon'>
              <MdBuild className='icon' />
            </span>
            <span>preferences</span>
          </Link>
        </li> */}
            {/* <li
              className={`${
                activeNavItem === 'support' ? classes.Active : null
              }`}
            >
              <Link to="/support">
                <span className="icon">
                  <MdHelp className="icon" />
                </span>
                <span>support</span>
              </Link>
            </li> */}
            <li
              onClick={this.props.handleCloseAside}
              className={`${
                activeNavItem === 'settings' ? classes.Active : null
              }`}
            >
              <Link to="/settings">
                <span className="icon">
                  <MdSettings className="icon" />
                </span>
                <span>settings</span>
              </Link>
            </li>
          </ul>
        </div>
      </aside>
    );
  }
}

export default withRouter(Aside);
