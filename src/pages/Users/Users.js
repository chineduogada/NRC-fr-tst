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
import classes from './Users.module.scss';

class Users extends Form {
  constructor(props) {
    super(props);

    this.id = this.props.match.params.id;

    this.state = {
      users: [],

      columns: [
        { accessor: 'fullName', Header: 'Name' },
        { accessor: 'email', Header: 'Email' },
        { accessor: 'role', Header: 'Role' },
        { accessor: 'status', Header: 'Status' }
      ],

      pageSize: 20,
      currentPage: 1,

      showForm: false,

      formData: {
        fullName: '',
        userName: '',
        roleId: '',
        // status: '',
        password: '',
        cPassword: ''
      },

      rowToPreview: null,

      isDeleteting: false,

      errors: {}
    };

    this.initialFormState = { ...this.state.formData };

    this.handleAddNew = this.handleAddNew.bind(this);
    this.closeSideDraw = this.closeSideDraw.bind(this);
    this.handleRowClick = this.handleRowClick.bind(this);
    this.addUser = this.addUser.bind(this);
    this.updateUser = this.updateUser.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  schema = {
    fullName: Joi.string(),
    userName: Joi.string(),
    roleId: Joi.string(),
    // status: Joi.string(),
    password: Joi.string(),
    cPassword: Joi.string()
  };

  async componentDidMount() {
    const users = [];

    const res = await httpService.get('/user');

    if (res) {
      res.data.data.forEach(user => {
        users.push(this.mapToViewModel(user));
      });
    }

    this.setState({ users });
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

  handlePageChange = page => {
    if (page) {
      this.setState({ currentPage: page });
    }
  };

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

  updateUserList(res) {
    const newDept = res.data.data;

    this.setState({ users: [...this.state.users, newDept] });
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

  removeTableRow() {
    const oldState = [...this.state.users];
    let rowIndex = oldState.findIndex(
      row => row.id === this.state.rowToPreview.id
    );

    oldState.splice(rowIndex, 1);

    this.setState({ users: oldState });
  }

  async handleDelete(event) {
    if (!this.state.isDeleteting) {
      this.setState({ isDeleteting: true });

      const res = await httpService.delete(
        `/user/${this.state.rowToPreview.id}`
      );

      if (res) {
        toast.success('User successfully deleted!');
        this.removeTableRow();
        this.updateForm.reset();
        this.resetFormData();
        this.closeSideDraw();
        this.setState({ isDeleteting: false });
      }
    }
  }

  async addUser(stopProcessing) {
    // const res = await httpService.post('/user', this.state.formData);

    const res = 1;

    // console.log(res);

    stopProcessing();

    if (res) {
      toast.success('Working in progress. Please, kindly check back.');
      // this.updateUserList(res);
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

  renderUpdateForm() {
    return (
      <div className={classes.Preview}>
        <div className={classes.Actions}>
          <Button
            label='delete'
            danger
            onClick={this.handleDelete}
            disabled={this.state.isDeleteting}
          />
        </div>
        <form
          ref={form => (this.updateForm = form)}
          onSubmit={this.handleSubmit}
        >
          {this.renderInput(
            'full name',
            'fullName',
            null,
            this.state.rowToPreview.fullName
          )}
          {this.renderInput(
            'description',
            'description',
            null,
            this.state.rowToPreview.description
          )}

          {this.renderButton('update')}
        </form>
      </div>
    );
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
          <Section>
            <TableView
              title='manage users'
              message='Double click a row to preview'
              columns={columns}
              data={users}
              clickHandler={this.handleRowClick}
              addNewButtonHandler={this.handleAddNew}
            ></TableView>

            <Modal
              title='department'
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

export default withRouter(Users);
