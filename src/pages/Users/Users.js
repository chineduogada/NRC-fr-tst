import React, { Component } from 'react';
import httpService from '../../services/httpService';
import Section from '../../hoc/Section/Section';
import Loader from '../../components/Loader/Loader';
import classes from './Users.module.scss';
import FaceCard from '../../components/Cards/FaceCard/FaceCard';

export default class Users extends Component {
  constructor(props) {
    super(props);

    this.state = {
      users: []
    };
  }

  async componentDidMount() {
    const res = await httpService.get('/users');

    if (res) {
      this.setState({ users: res.data.data });
    }
  }

  render() {
    const { users } = this.state;
    return users ? (
      <Section>
        <Section title='manage users'>
          <p>We are the users of this app</p>
          <div className={classes.Users}>
            <div className={`d-flex ${classes.User}`}>
              <div className={classes.UserImageAndName}>
                <div className={classes.UserImage}></div>
                <p className={classes.UserName}>mike some </p>
              </div>

              <div className={classes.UserActions}>
                <span className={`${classes.UserAction} ${classes.Status}`}>
                  active
                </span>
                <span className={`${classes.UserAction} ${classes.Role}`}>
                  user
                </span>
                <span
                  className={`${classes.UserAction} ${classes.Update}`}
                ></span>
              </div>
            </div>
          </div>
        </Section>
        <Section title='manage roles'>
          <p>We are the users of this app</p>
          <div className={classes.Users}></div>
        </Section>
      </Section>
    ) : (
      <Loader message='please wait' />
    );
  }
}
