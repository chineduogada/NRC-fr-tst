/* eslint-disable array-callback-return */
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import classes from './Settings.module.scss';
import Section from '../../hoc/Section/Section';

export default class Settings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTab: 0
    };
  }

  render() {
    return (
      <Section title='settings'>
        <br />
        <Section>
          <div className={classes.Setting}>
            <h5 className={classes.SettingTitle}>
              <Link to='settings/static-models'>Static Models</Link>
            </h5>
            <p className={classes.SettingDescription}>
              Allows users to add or update all table values
            </p>
          </div>
          <hr />
        </Section>
      </Section>
    );
  }
}
