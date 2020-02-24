import React, { Component } from 'react';
import { IoMdPerson, IoMdCloudUpload } from 'react-icons/io';
import { MdApps } from 'react-icons/md';
import getCredentials from '../../services/Credentials';
import { Link, withRouter } from 'react-router-dom';
import Dropdown from '../Dropdown/Dropdown';
import './Nav.scss';
import { GetImage } from '../../services/employeeService';

// Navigation
class Nav extends Component {
  constructor(props) {
    super(props);
    this.state = {
      imageSource: null
    };
  }

  render() {
    const { role, firstName, lastName, photo } = getCredentials();
    const activeNavItem = this.props.location.pathname.split('/')[1];
    console.log(activeNavItem);

    return (
      <nav id="main-nav">
        {/* Logo */}
        {/* <Link to='/'><h1 id="logo">NRC HR</h1></Link> */}
        <div></div>

        {/* Main Menu */}
        <div className="menu main-menu">
          {/* Hamburger */}
          <p className="hamburger">{<MdApps className="icon" size="15px" />}</p>
          {/* Menu Items */}
          <ul>
            <li>
              <Link to="/" className=""></Link>
            </li>
            <li>
              {lastName} {firstName}
            </li>
            <li className="btn">
              <Link
                to="/import"
                className={`${activeNavItem === 'import' ? 'Active' : null}`}
              >
                <IoMdCloudUpload className="icon" size="15px" /> Import data
              </Link>
            </li>
            {role.type === 'admin' ? (
              <li>
                <Link
                  to="/users"
                  className={`${activeNavItem === 'users' ? 'Active' : null}`}
                >
                  {<IoMdPerson className="icon" size="15px" />} All Users
                </Link>
              </li>
            ) : null}
          </ul>
          <Dropdown
            trigger={
              <li className="nav-user">
                <div className="nav-user-image-wrap">
                  <GetImage imageSource={photo || null} />
                </div>
              </li>
            }
          >
            <ul>
              <li>
                <Link to="/profile">Profile</Link>
              </li>
              <li>
                <Link onClick={this.props.triggerSignOut} to="/">
                  Log out
                </Link>
              </li>
            </ul>
          </Dropdown>
        </div>
      </nav>
    );
  }
}

export default withRouter(Nav);
