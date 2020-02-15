import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import Joi from 'joi-browser';
import { toast } from 'react-toastify';
import _ from 'lodash';
import Loader from '../../components/Loader/Loader';
import httpService from '../../services/httpService';
import getCredentials from '../../services/Credentials';
import { GetImage } from '../../services/employeeService';
import Section from '../../hoc/Section/Section';
import SideDraw from '../../components/SideDraw/SideDraw';
import Modal from '../../components/Modal/Modal';
import Button from '../../components/Button/Button';
import UserForm from './UserForm';
import classes from './UserProfile.module.scss';

class UserProfile extends Component {
  constructor(props) {
    super(props);

    this.id = this.props.match.params.id;

    console.log(props);

    this.state = {
      users: [],

      user: null,

      showForm: false,

      showModal: false,

      errors: {}
    };

    this.handleAddNew = this.handleAddNew.bind(this);
    this.closeSideDraw = this.closeSideDraw.bind(this);
  }

  fetchLocalUser() {}

  async fetchUserViaAPI() {
    // const users = [];
    // const res = await httpService.get('/user');
    // if (res) {
    //   res.data.data.forEach(user => {
    //     users.push(this.mapToViewModel(user));
    //   });
    // }
    // this.setState({ users });
  }

  async componentDidMount() {
    this.fetchUserViaAPI();
  }

  handleAddNew(e) {
    this.setState({ showForm: true, rowToPreview: null });
  }

  closeSideDraw(e) {
    this.setState({ showForm: false, rowToPreview: null });
  }

  mapToViewModel(data) {
    return {
      id: data.id,
      fullName: data.fullName,
      email: data.email,
      role: data.role,
      status: data.status
    };
  }

  render() {
    const { users, columns } = this.state;
    const { firstName, lastName, role, photo } = getCredentials();

    return (
      <React.Fragment>
        {this.state.users ? (
          <Section title=''>
            <div className={classes.UserProfile}>
              <div className={classes.Header}>
                <div className={classes.UserProfilePic}>
                  <GetImage imageSource={photo || null} />
                </div>
                <div className={classes.UserInfo}>
                  <p className={classes.UserFullName}>
                    {firstName} {lastName}
                  </p>
                  <p className={classes.UserRole}>{role.type}</p>
                </div>
              </div>
              <div className={classes.ChangePassword}>
                <UserForm />
              </div>
            </div>
            <Modal
              title=''
              openModal={this.state.showForm}
              onClose={this.closeSideDraw}
            >
              helkloe
            </Modal>
          </Section>
        ) : (
          <Loader />
        )}
      </React.Fragment>
    );
  }
}

export default withRouter(UserProfile);
