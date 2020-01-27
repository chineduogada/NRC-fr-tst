import React from 'react';
import { withRouter } from 'react-router-dom';
import Joi from 'joi-browser';
import { toast } from 'react-toastify';
import _ from 'lodash';
import Loader from '../../components/Loader/Loader';
import httpService from '../../services/httpService';
import Section from '../../hoc/Section/Section';
import TableView from '../../components/TableView/TableView';
import SideDraw from '../../components/SideDraw/SideDraw';
import Modal from '../../components/Modal/Modal';
import Form from '../../components/Form/Form';
import Button from '../../components/Button/Button';
import classes from './UserProfile.module.scss';

class UserProfile extends Form {
  constructor(props) {
    super(props);

    this.id = this.props.match.params.id;

    console.log(props)

    this.state = {
      users: [],

      user: null,

      showForm: false,

      formData: {
        fullName: '',
        userName: '',
        roleId: '',
        // status: '',
        password: '',
        cPassword: ''
      },

      errors: {}
    };

    this.initialFormState = { ...this.state.formData };

    this.handleAddNew = this.handleAddNew.bind(this);
    this.closeSideDraw = this.closeSideDraw.bind(this);
    this.addUser = this.addUser.bind(this);
  }

  schema = {
    fullName: Joi.string(),
    userName: Joi.string(),
    roleId: Joi.string(),
    // status: Joi.string(),
    password: Joi.string(),
    cPassword: Joi.string()
  };

  async fetchUserViaAPI() {
    const users = [];

    const res = await httpService.get('/user');

    if (res) {
      res.data.data.forEach(user => {
        users.push(this.mapToViewModel(user));
      });
    }

    this.setState({ users });
  }

  async componentDidMount() {
    this.fetchUserViaAPI()
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

  handleRowClick(event) {
    if (event.detail > 1) {
      const rowToPreview = this.state.users.filter(
        user => user.id === event.currentTarget.id * 1
      )[0];

      this.setState({
        rowToPreview,
        showForm: true,
        formData: _.pick(rowToPreview, ['fullName', 'role', 'email', 'status'])
      });
    }
  }

  resetFormData() {
    this.setState({ formData: this.initialFormState });
  }

  updateTableRow() {
    const oldState = [...this.state.users];
    const id = this.state.rowToPreview.id;
    const formData = this.state.formData;
    const rowIndex = oldState.findIndex(row => row.id === id);

    oldState[rowIndex] = { ...formData, id };

    this.setState({ users: oldState });
  }

  async updateUser(stopProcessing) {
    const res = await httpService.put(
      `/user/${this.state.rowToPreview.id}`,
      this.state.formData
    );

    stopProcessing();

    if (res) {
      toast.success('User successfully updated!');
      this.updateTableRow();
      this.closeSideDraw();
      this.resetFormData();
    }
  }

  async addUser(stopProcessing) {
    // const res = await httpService.post('/user', this.state.formData);

    const res = 1;

    // console.log(res);

    stopProcessing();

    if (res) {
      toast.success('Working in progress. Please, kindly check back.');
      this.Form.reset();
      this.resetFormData();
      this.closeSideDraw();
    }
  }

  async doSubmit(event, stopProcessing) {
    if (this.state.rowToPreview) {
      return this.updateUser(stopProcessing);
    }

    this.addUser(stopProcessing);
  }

  renderDepartmentForm() {
    return (
      <form ref={form => (this.Form = form)} onSubmit={this.handleSubmit}>
        <p>Add a new user</p>

        {this.renderInput('full name', 'fullName')}
        {this.renderInput('username', 'userName')}
        {this.renderSelect('role', 'roleId', [
          { id: 1, name: 'admin' },
          { id: 2, name: 'user' }
        ])}
        {/* {this.renderSelect('status', 'status', [
          { id: 'active', name: 'active' },
          { id: 'inactive', name: 'inactive' }
        ])} */}
        {this.renderInput('password', 'password', null, null, 'password')}
        {this.renderInput(
          'confirm  password',
          'cPassword',
          null,
          null,
          'password'
        )}

        {this.renderButton('save')}
      </form>
    );
  }

  render() {
    const { users, columns } = this.state;

    return (
      <React.Fragment>
        {this.state.users ? (
          <Section title='profile'>
            <div className={classes.UserProfile}>
              <div className={classes.UserProfilePic}>
                <img src='' alt='user-profile-picture' />
              </div>
              <p className={classes.UserFullName}>full name here</p>
            </div>
            <Modal
              title=''
              openModal={this.state.showForm}
              onClose={this.closeSideDraw}
            >
              {this.state.rowToPreview
                ? this.renderUpdateForm()
                : this.renderDepartmentForm()}
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
