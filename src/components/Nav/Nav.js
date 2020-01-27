import React from 'react';
import { IoMdPerson, IoMdCloudUpload } from 'react-icons/io';
import { MdApps } from 'react-icons/md';
import getCredentials from '../../services/Credentials';
import { Link } from 'react-router-dom';
import Dropdown from '../Dropdown/Dropdown';
import './Nav.scss';

// Navigation
const Nav = props => {
  const { role, firstName, lastName } = getCredentials();

  return (
    <nav id="main-nav">
      {/* Logo */}
      {/* <Link to='/'><h1 id="logo">Teamwork</h1></Link> */}

      {/* Main Menu */}
      <div className="menu main-menu">
        {/* Hamburger */}
        <p className="hamburger">{<MdApps className="icon" size="15px" />}</p>
        {/* Menu Items */}
        <ul>
          <li>
            <Link to="/" className="active"></Link>
          </li>
          <li>
            {lastName} {firstName}
          </li>
          <li className="btn">
            <Link to="/import">
              <IoMdCloudUpload className="icon" size="15px" /> Import data
            </Link>
          </li>
          {role === 'admin' ? (
            <li>
              <Link to="/users">
                {<IoMdPerson className="icon" size="15px" />} All Users
              </Link>
            </li>
          ) : null}
          <Dropdown trigger={<li className="user"></li>}>
            <ul>
              <li>
                <Link to="/profile">Profile</Link>
              </li>
              <li>
                <Link onClick={props.triggerSignOut} to="/">
                  Log out
                </Link>
              </li>
            </ul>
          </Dropdown>

          {/* <li><Link to={`users/${userId}`}>Me</Link></li> */}
        </ul>
      </div>
    </nav>
  );
};

export default Nav;
