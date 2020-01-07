import React from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import { getToken } from '../../services/Credentials';
import Nav from '../Nav/Nav';
import Aside from './Aside/Aside';
import classes from './Layout.module.css';

const layout = props => {
  // set token
  const token = getToken();
  console.log(token);
  if (token) {
    axios.defaults.headers = {
      token
    };
  }

  const renderLayout = () => (
    <div className={classes.Layout}>
      <Aside />
      <div>
        {/* Navigation */}
        <Nav triggerSignOut={props.signOutHandler} />

        {/* Main Section */}
        <main>{props.children}</main>
      </div>
    </div>
  );

  return true ? renderLayout() : <Redirect to="/signin" />;
};

export default layout;
