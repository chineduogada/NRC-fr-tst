import React from 'react';
import { IoMdPerson, IoMdCloudUpload } from 'react-icons/io';
import { MdApps } from 'react-icons/md';
import getCredentials from '../../services/Credentials';
import { Link } from 'react-router-dom';
import './Nav.scss';

// Navigation
const Nav = props => {
  const { role, firstName, lastName } = getCredentials();

  return (
    <nav id='main-nav'>
      {/* Logo */}

      {/* Main Menu */}
      <div className='menu main-menu'>
        {/* Hamburger */}
        <p className='hamburger'>{<MdApps className='icon' size='15px' />}</p>
        {/* Menu Items */}
        <ul>
          <li>
            <Link to='/' className='active'></Link>
          </li>
          <li>
            {lastName} {firstName}
          </li>
          <li className='btn'>
            <Link to='/import'>
              <IoMdCloudUpload className='icon' size='15px' /> Import data
            </Link>
          </li>
          {role === 'admin' ? (
            <li>
              <Link to='/users'>
                {<IoMdPerson className='icon' size='15px' />} All Users
              </Link>
            </li>
          ) : null}
          <li className='user'>
            <Link onClick={props.triggerSignOut} to='/'>
              {/* Logout */}
            </Link>
          </li>
          {/* <li><Link to={`users/${userId}`}>Me</Link></li> */}
        </ul>
      </div>
    </nav>
  );
};

export default Nav;
