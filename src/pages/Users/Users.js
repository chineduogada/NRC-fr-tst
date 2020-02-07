import React from 'react';
import { withRouter } from 'react-router-dom';
import Joi, { options } from 'joi-browser';
import { toast } from 'react-toastify';
import _ from 'lodash';
import Loader from '../../components/Loader/Loader';
import httpService from '../../services/httpService';
import Section from '../../hoc/Section/Section';
import TableView from '../../components/TableView/TableView';
import SideDraw from '../../components/SideDraw/SideDraw';
import Modal from '../../components/Modal/Modal';
import Form from '../../components/Form/Form';
import Button from '../../components/Button/Button'
import nameMapper from '../../helpers/nameMapper';
import classes from './Users.module.scss';
import Select from '../../components/Select/Select';

class Users extends Form {
  constructor(props) {
    super(props);

    this.id = this.props.match.params.id;

    this.state = {
      users: [],

      columns: [
        { accessor: 'fullname', Header: 'Name' },
        { accessor: 'username', Header: 'Username',
        Cell: ({ original, value }) => (
          <span className={classes.Custom}>
            {value}
          </span>
        ) },
        { accessor: 'role', Header: 'Role' },
        { accessor: 'status', Header: 'Status' }
      ],

      pageSize: 20,
      currentPage: 1,

      showForm: false,

      formData: {
        ippisNo: '',
        username: '',
        roleId: '',
        statusId: '',
        password: '',
        confirmPassword: ''
      },

      options: {
        roleOptions: [
          { id: 1, type: 'admin' },
          { id: 2, type: 'user' },
        ],
        statusOptions: [
          { id: 1, status: 'active' },
          { id: 2, status: 'inactive' },
        ]
      },

      updateForm: {},

      rowToPreview: null,

      isDeleteting: false,

      errors: {}
    };

    this.initialFormState = { ...this.state.formData };

    this.handleAddNew = this.handleAddNew.bind(this);
    this.closeSideDraw = this.closeSideDraw.bind(this);
    this.handleRowClick = this.handleRowClick.bind(this);
    this.addUser = this.addUser.bind(this);
    this.updateObjectList = this.updateObjectList.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleUpdateForm = this.handleUpdateForm.bind(this);
    this.handleUpdateFormSelectChange = this.handleUpdateFormSelectChange.bind(this);
    this.gotoProfile = this.gotoProfile.bind(this);
  }

  schema = {
    ippisNo: Joi.number(),
    username: Joi.string(),
    roleId: Joi.number(),
    statusId: Joi.number(),
    password: Joi.string(),
    confirmPassword: Joi.string()
  };

  async componentDidMount() {
    const users = [];

    const res = await httpService.get('/users');

    if (res) {
      res.data.data.forEach(user => {
        users.push(this.mapToViewModel(user));
      });
    }

    this.setState({ users });
  }

  handleAddNew(e) {
    this.resetFormData();
    this.setState({ showForm: true, rowToPreview: null });
  }

  closeSideDraw(e) {
    this.setState({ showForm: false });
  }

  mapToViewModel({ id, ippisNo, username, role, status, employee, roleId, statusId }) {
    return {
      id,
      ippisNo,
      fullname: employee ? `${employee.firstName} ${employee.lastName}` : username,
      username,
      roleId, 
      role: role.type,
      statusId,
      status: status.status
      
    };
  }

  handlePageChange = page => {
    if (page) {
      this.setState({ currentPage: page });
    }
  };

  gotoProfile() {
    const { ippisNo } = this.state.rowToPreview;
    if (ippisNo) {
      this.props.history.push(`employees/${ippisNo}`);
    }
  }

  handleRowClick(event) {
    if (event.detail > 1) {
      const rowToPreview = this.state.users.filter(
        user => user.id === event.currentTarget.id * 1
      )[0];

      this.setState({
        rowToPreview,
        showForm: true,
        updateForm: _.pick(rowToPreview, ['roleId', 'statusId'])
      });
    }
  }
/**
   * Adds the newly created data object to the list of data objects initially returned from the server
   * @param { Response } res Axios response object
   */
  updateObjectList(res) {
    const newDataObject = res.data.data;
    const filteredNewDataObject = this.mapToViewModel({...newDataObject, ...this.getOptionValues()});
    console.log(filteredNewDataObject)

    this.setState({ users: [filteredNewDataObject, ...this.state.users] });
  }

  resetFormData() {
    this.setState({ formData: this.initialFormState });
  }

  /**
   * Gets actual values of the options the user has updated
   */
  getOptionValues() {
    const { statusId, roleId } = this.state.formData;
    return {
      status: this.state.options.statusOptions.filter(option => option.id === statusId * 1)[0],
      role: this.state.options.roleOptions.filter(option => option.id === statusId * 1)[0]
    }
  }

  /**
   * Updates the table row each time a new data object is added
   */
  updateTableRow() {
    // create a copy of the filtered data stored in the state
    const oldState = [...this.state.users];
    // obtain the id or the row to be previewed
    const id = this.state.rowToPreview.id;
    // obtain the form data in the state (it contains the values the user just updated)
    const formData = this.state.formData;
    // map every option to the current value the user may have selected and join them with the from data
    const updatedRowToPreview = {...formData, ...this.getOptionValues() }
    // obtain the index of the row the use jus
    const rowIndex = oldState.findIndex(row => row.id === id);
    // map the updated data to the desired view (Ex: for table display)
    const filteredUpdatedRow = this.mapToViewModel(updatedRowToPreview);
    // updating the copy of the filtered data from the server
    oldState[rowIndex] = { ...filteredUpdatedRow, id };

    this.setState({ users: oldState });
  }

  async updateDataObject() {
    this.startProcessing();

    const res = await httpService.patch(
      `/users/${this.state.rowToPreview.id}`,
      this.state.updateForm
    );

    this.stopProcessing();

    if (res) {
      toast.success("User's state successfully updated!");
      // this.updateTableRow();
      this.props.history.go()
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

  async handleDelete({ currentTarget }) {
    if (this.state.rowToPreview.username === 'superadmin') {
      return;
    }

    if (!this.state.isDeleteting) {
      this.setState({ isDeleteting: true });

      const res = await httpService.delete(
        `/users/${this.state.rowToPreview.id}`
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
    const res = await httpService.post('/users', this.state.formData);

    this.stopProcessing();

    if (res) {
      toast.success('User successfully added');
      // this.updateObjectList(res);
      this.props.history.go();
      this.Form.reset();
      this.resetFormData();
      this.closeSideDraw();
    }
  }

  async doSubmit(event, stopProcessing) {
    if (this.state.rowToPreview) {
      return this.updateDataObject(stopProcessing);
    }

    this.addUser(stopProcessing);
  }

  handleUpdateForm(event) {
    event.preventDefault();
    this.updateDataObject();
  }

  handleUpdateFormSelectChange({ currentTarget }) {
    const updateForm = { ...this.state.updateForm };
    updateForm[currentTarget.name] = currentTarget.value;
    this.setState({ updateForm });
  }

  renderUpdateForm() {
    const { options, formData, updateForm, rowToPreview } = this.state;
    const isSuperAdmin = rowToPreview.username === 'superadmin';

    return (
      <div className={classes.Preview}>
        <div className={classes.Actions}>
          <Button
            label='delete'
            danger
            onClick={this.handleDelete}
            disabled={this.state.isDeleteting || isSuperAdmin}
          />
          <Button
            label='view profile'
            highlight
            onClick={this.gotoProfile}
            disabled={!rowToPreview.ippisNo}
          />
        </div>
        <br />
        <form
          ref={form => (this.updateForm = form)}
          onSubmit={this.handleUpdateForm}
        >
          <Select name='roleId' onChange={this.handleUpdateFormSelectChange} className='formControl' options={nameMapper(options.roleOptions, 'type')} selectedOption={updateForm.roleId} disabled={isSuperAdmin} />
          <Select name='statusId' onChange={this.handleUpdateFormSelectChange} className='formControl' options={nameMapper(options.statusOptions, 'status')} selectedOption={updateForm.statusId} disabled={isSuperAdmin} />
          {this.renderButton('update')}
        </form>
      </div>
    );
  }

  renderDepartmentForm() {
    const { options } = this.state;
    return (
      <form ref={form => (this.Form = form)} onSubmit={this.handleSubmit}>
        <p>Add a new user</p>

        {this.renderInput('IPPIS no.', 'ippisNo', null, null, 'number')}
        {this.renderInput('username', 'username')}
        {this.renderSelect('role', 'roleId', nameMapper(options.roleOptions, 'type'))}
        {this.renderSelect('status', 'statusId', nameMapper(options.statusOptions, 'status'))}
        {this.renderInput('password', 'password', null, null, 'password')}
        {this.renderInput(
          'confirm  password',
          'confirmPassword',
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
              message="Double click a row to update user's state"
              columns={columns}
              data={users}
              clickHandler={this.handleRowClick}
              addNewButtonHandler={this.handleAddNew}
            ></TableView>

            <Modal
              title='user'
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
